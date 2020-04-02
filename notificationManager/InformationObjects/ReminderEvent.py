from InformationObjects import EventInfo, UserInfo

class ReminderEvent:
    def __init__(self, userInfo, eventInfo):
        self.userInfo = userInfo
        self.eventInfo = eventInfo

    @property
    def return_text_body_str(self):
        """This function acts as get/set for _phoneNumber 
        
        :getter: Returfajflajjfajfakl;jfafkakjsfk;ajfakns this phone_number, or False if empty.
        :setter: Sets this phone_number, or sets to False if passed in phoneNumber is empty.
        :type: int
        """
        return "Notification Reminder from the {}.\nThe event {} will start in 15 minutes.".format(self.eventInfo.conference_name, self.eventInfo.event_name)

    @property
    def return_email_body_str(self):
        return '''Dear {},\n\nNotification Reminder for the conference: \"{}\".\n\nThe event \"{}\" will start in 15 minutes.\n\nThe event will be between {} and {}.\nLocated in {} on floor {}, room {}.\n\nSpeakers: {}.\nDescription of Event: {}.
            \nThank you for attending, we hope you enjoy!\n\nSincerely,\n{}'''.\
            format(self.userInfo.user_name, self.eventInfo.conference_name, self.eventInfo.event_name, self.eventInfo.event_start_time_normal_time_str, self.eventInfo.event_end_time_normal_time_str,\
                self.eventInfo.event_building, self.eventInfo.event_floor, self.eventInfo.event_room, ','.join(self.eventInfo.event_speaker), self.eventInfo.event_desc, self.eventInfo.conference_name)
        
    def print(self):
        print(self.__str__())

    def __eq__(self, other):
        return self.eventInfo.__eq__(other.eventInfo) and self.userInfo.__eq__(other.userInfo)
    
    def __str__(self):
        return "{} {}".format(self.userInfo.__str__(), self.eventInfo.__str__())

    def __lt__(self, other):
        return (self.eventInfo.event_start_hour, self.eventInfo.event_start_minute) > (other.eventInfo.event_start_hour, other.eventInfo.event_start_minute)