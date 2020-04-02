import re
import os
import datetime
from SenderObjects import EmailNotification, TextViaEmail
from InformationObjects import UserInfo, EventInfo, ReminderEvent
import pymysql
import heapq
import schedule
import time
import logging
"""
SenderObjects.UserInfo
====================================
The UserInfo module acts as container for each 'User Object'.
"""

class database_sql:
    """DVC Constructor - Declares and initlizes empty queue instance variable. 

    """
    def __init__(self):
        self.pQueue = []

    def execute_use_database(self, cursor):
        query = ("USE {}".format(os.environ.get('DATABASE_NAME')) )
        cursor.execute(query)

    def removeParan(self, sql):
        temp = str(sql).strip()
        return temp[1:-1]

    def convertStrCodeToObj(self, code):
        return eval(code)

    def retrieve_table_info(self):
        logging.basicConfig(filename=os.environ.get('LOG_FILE_PATH'), level=logging.DEBUG)
        db = pymysql.connect(host=os.environ.get('DATABASE_HOST_NAME'),user=os.environ.get('DATABASE_USER_NAME'),passwd=os.environ.get('DATABASE_PASSWORD'))
        query = ("USE {}".format(os.environ.get('DATABASE_NAME')) )
        db.cursor().execute(query)
        cursor = db.cursor()
        heapq.heapify(self.pQueue)
        todayDateObj = datetime.datetime.today()
        todayDateStr = todayDateObj.strftime('%Y-%m-%d')
        addedTimeDeltaObj = datetime.timedelta(minutes=15)
        timeCheckObj = todayDateObj + addedTimeDeltaObj
        timeCheckStr = timeCheckObj.strftime("%H:%M")
        logging.info("___________________________")
        logging.info("Notification Attempt on {} for {} at {}".format(todayDateStr, timeCheckStr, datetime.datetime.now()))

        cursor.execute('''SELECT userInfo.user_id, userInfo.user_name, userInfo.user_phone, userInfo.user_email, userInfo.user_phoneCarrier, userInfo.user_notifyByEmail, userInfo.user_notifyByPhone, event.event_id, event.event_name, event.event_starttime, event.event_endtime, event.event_room, event.event_floor, event.event_building, event.event_speakers, event.event_desc, event.event_wheelchair, event.event_date, conference.conference_name
                                        FROM (SELECT account.user_id, account.user_name, account.user_phone, account.user_email, account.user_phoneCarrier, account.user_notifyByEmail, account.user_notifyByPhone, uConference.conference_id, schedule.event_id FROM user_accounts as account, user_schedule as schedule, user_conference as uConference
                                        WHERE account.user_id = schedule.user_id and schedule.user_id = uConference.user_id
                                        ) as userInfo, conference, event
                                            WHERE conference.conference_id = userInfo.conference_id and event.event_id = userInfo.event_id and event.event_date = \"{}\" and event.event_starttime = \"{}:00\"
                                            '''.format(todayDateStr, timeCheckStr))
        listOfArr = cursor.fetchall()
        num = 1
        for arr in listOfArr:
            userInfoObj = UserInfo.UserInfo(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6])
            eventInfoObj = EventInfo.EventInfo(arr[7], arr[8], arr[9], arr[10], arr[11], arr[12], arr[13], arr[14].split(","), arr[15], arr[16], arr[17], arr[18])
            reminderEvent = ReminderEvent.ReminderEvent(userInfoObj, eventInfoObj)
            num += 1
            heapq.heappush(self.pQueue, reminderEvent)
            logging.info("Event ADDED: {}".format( reminderEvent.__str__() ))

        emailNotifyer = EmailNotification.EmailNotification()
        textEmailer = TextViaEmail.TextViaEmail()
        while len(self.pQueue) > 0 :
            reminderElement = heapq.nsmallest(1, self.pQueue)[0]
            if reminderElement.userInfo.notify_by_email:
                try:
                    emailNotifyer.send_email(reminderElement.userInfo.email_address, reminderElement.return_email_body_str, "Notification for {}".format(reminderElement.eventInfo.event_name))
                    logging.info("Email Successful: Sent to {}".format(reminderElement.userInfo.email_address))
                except:
                    logging.info("Email Unsuccesful: Did not send to {}".format(reminderElement.userInfo.email_address))

            if reminderElement.userInfo.notify_by_phone:
                try:
                    textEmailer.send_email(reminderElement.userInfo.phone_number, reminderElement.userInfo.phone_carrier, reminderElement.return_text_body_str)
                    logging.info("Text Succesful: Send to {}".format(reminderElement.userInfo.phone_number))
                except:
                    logging.info("Text Unsuccesful: Did not send to {}".format(reminderElement.userInfo.phone_number))

            heapq.heappop(self.pQueue)
        if len(self.pQueue) == 0:
            logging.info("Queue was empty at time of termination.")
        else:
            logging.info("Queue was not empty at time of termination")

        logging.info("Time of termination after submitting notifications: {}".format(datetime.datetime.now()) )
        logging.info("___________________________\n")

if __name__ == "__main__":
    d = database_sql()
    d.retrieve_table_info()