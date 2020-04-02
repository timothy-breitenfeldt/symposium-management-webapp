from datetime import datetime

class EventInfo:
    def __init__(self, eventId, eventName, eventStartTime, eventEndTime, eventRoom, eventFloor, eventBuilding, eventSpeaker, eventDesc, eventWheelchair, eventDate, conferenceName):
        self._eventId = None
        self._eventName = None
        self._eventStartTime = None
        self._eventEndTime = None
        self._eventRoom = None
        self._eventFloor = None
        self._eventBuilding = None
        self._eventSpeaker = None
        self._eventDesc = None
        self._eventWheelchair = None
        self._eventDate = None
        self._conferenceName = None
        self.set_all(eventId, eventName, eventStartTime, eventEndTime, eventRoom, eventFloor, eventBuilding, eventSpeaker, eventDesc, eventWheelchair, eventDate, conferenceName)

    @property
    def event_id(self):
        return self._eventId
    
    @event_id.setter
    def event_id(self, eventId):
        self._eventId = eventId

    @property
    def event_name(self):
        return self._eventName
    
    @event_name.setter
    def event_name(self, eventName):
        self._eventName = eventName

    @property
    def event_start_time(self):
        return self._eventStartTime
    
    @event_start_time.setter
    def event_start_time(self, eventStartTime):
        self._eventStartTime = (datetime.min + eventStartTime).time()

    @property
    def event_start_hour(self):
        return self.event_start_time.strftime("%H")

    @property
    def event_start_time_millitary_time_str(self):
        return self.event_start_time.strftime("%H:%M")

    @property
    def event_start_time_normal_time_str(self):
        return self.event_start_time.strftime("%I:%M %p")

    @property
    def event_start_minute(self):
        return self.event_start_time.strftime("%M")

    @property
    def event_end_time(self):
        return self._eventEndTime
    
    @event_end_time.setter
    def event_end_time(self, eventEndTime):
        self._eventEndTime = (datetime.min + eventEndTime).time()

    @property
    def event_end_time_millitary_time_str(self):
        return self.event_end_time.strftime("%H:%M")

    @property
    def event_end_time_normal_time_str(self):
        return self.event_end_time.strftime("%I:%M %p")

    @property
    def event_room(self):
        return self._eventRoom
    
    @event_room.setter
    def event_room(self, eventRoom):
        self._eventRoom = eventRoom

    @property
    def event_floor(self):
        return self._eventFloor
    
    @event_floor.setter
    def event_floor(self, eventFloor):
        self._eventFloor = eventFloor

    @property
    def event_building(self):
        return self._eventBuilding
    
    @event_building.setter
    def event_building(self, eventBuilding):
        self._eventBuilding = eventBuilding

    @property
    def event_speaker(self):
        return self._eventSpeaker
    
    @event_speaker.setter
    def event_speaker(self, eventSpeaker):
        self._eventSpeaker = eventSpeaker
        self._eventSpeaker.sort()
     
    @property
    def event_desc(self):
        return self._eventDesc
    
    @event_desc.setter
    def event_desc(self, eventDesc):
        self._eventDesc = eventDesc.strip()

    @property
    def event_wheelchair(self):
        return self._eventWheelchair
    
    @event_wheelchair.setter
    def event_wheelchair(self, eventWheelchair):
        self._eventWheelchair = eventWheelchair

    @property
    def event_date(self):
        return self._eventDate
    
    @event_date.setter
    def event_date(self, eventDate):
        self._eventDate = eventDate

    @property
    def event_year(self):
        return str(self.event_date.strftime('%Y'))

    @property
    def event_month(self):
        return str(self.event_date.strftime('%M'))

    @property
    def event_day(self):
        return str(self.event_date.strftime('%d'))

    @property
    def conference_name(self):
        return self._conferenceName
    
    @conference_name.setter
    def conference_name(self, conferenceName):
        self._conferenceName = conferenceName
        self._conferenceName = conferenceName

    def event_speaker_is_equal(self, other):
        selfLength = len(self.event_speaker)
        otherLength = len(other)
        if(selfLength != otherLength):
            return False
        else:
            for index in range(0, selfLength):
                if(self.event_speaker[index] != other[index]):
                    return False
            return True

    def set_all(self, eventId, eventName, eventStartTime, eventEndTime, eventRoom, eventFloor, eventBuilding, eventSpeaker, eventDesc, eventWheelchair, eventDate, conferenceName):
        self.event_id = eventId
        self.event_name = eventName
        self.event_start_time = eventStartTime
        self.event_end_time = eventEndTime
        self.event_room = eventRoom
        self.event_floor = eventFloor
        self.event_building = eventBuilding
        self.event_speaker = eventSpeaker
        self.event_desc = eventDesc
        self.event_wheelchair = eventWheelchair
        self.event_date = eventDate
        self.conference_name = conferenceName

    def __eq__(self, other):
        return self.event_id == other.event_id

    def __str__(self):
        return "EventInfo -> eventId: {}, eventName: {}, eventStartTime: {}, eventEndTime: {}, eventRoom: {}, eventFloor: {}, eventBuilding: {}, eventSpeakers: {}, eventDesc: {}, eventWheelchair {}, eventDate {}, conferenceName: {}"\
            .format(self.event_id, self.event_name, self.event_start_time, self.event_end_time, self.event_room, self.event_floor, self.event_building, self.event_speaker, self.event_desc, self.event_wheelchair, self.event_date, \
                self.conference_name)

    def __lt__(self, other):
        (self.event_year, self.event_month, self.event_day, self.event_start_hour, self.event_start_minute) < \
               (other.event_year, other.event_month, other.event_day, other.event_start_hour, other.event_start_minute)