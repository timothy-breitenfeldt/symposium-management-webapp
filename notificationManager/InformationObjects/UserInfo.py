"""
SenderObjects.UserInfo
====================================
The UserInfo module acts as container for each 'User Object'.
"""

class UserInfo:
    def __init__(self, userId, userName, phoneNumber, emailAddress, phoneCarrier, notifyByEmail, notifyByPhone):
        """EVC Constructor - Takes in parsed components of UserInfo at once (Coding smell). 
        Uses setAll method within __init__ method to set class variables using setters.

        """
        self._userId = None
        self._userName = None
        self._phoneNumber = None
        self._emailAddress = None
        self._phoneCarrier = None
        self._notifyByEmail = None
        self._notifyByPhone = None
        self.setAll(userId, userName, phoneNumber, emailAddress, phoneCarrier, notifyByEmail, notifyByPhone)

    @property
    def user_id(self):
        """This function acts as get/set for userId (Does not check if unique... yet)
        
        :getter: Returns this userId
        :setter: Sets this userId
        :type: str.
        """
        return self._userId
    
    @user_id.setter
    def user_id(self, userId):
        self._userId = userId

    @property
    def user_name(self):
        """This function acts as get/set for _userName 
        
        :getter: Returns this _userName
        :setter: Sets this _userName
        :type: str.
        """
        return self._userName
    
    @user_name.setter
    def user_name(self, userName):
        self._userName = userName

    @property
    def phone_number(self):
        """This function acts as get/set for _phoneNumber 
        
        :getter: Returns this phone_number, or False if empty.
        :setter: Sets this phone_number, or sets to False if passed in phoneNumber is empty.
        :type: int
        """
        return self._phoneNumber
    
    @phone_number.setter
    def phone_number(self, phoneNumber):
        if len(phoneNumber) == 0:
            self._phoneNumber = False
        else:
            self._phoneNumber = phoneNumber

    @property
    def email_address(self):
        """This function acts as get/set for _emailAddress
        
        :getter: Returns this _emailAddress, or False if empty.
        :setter: Sets this _emailAddress, or sets to False if passed in emailAddress is empty.
        :type: str.
        """
        return self._emailAddress
    
    @email_address.setter
    def email_address(self, emailAddress):
        if len(emailAddress) == 0:
            self._emailAddress = False
        else:
            self._emailAddress = emailAddress

    @property
    def phone_carrier(self):        
        """This function acts as get/set for _phoneCarrier
        
        :getter: Returns this _phoneCarrier, or False if empty.
        :setter: Sets this _phoneCarrier, or sets to False if passed in phoneCarrier is empty.
        :type: str.
        """
        return self._phoneCarrier
    
    @phone_carrier.setter
    def phone_carrier(self, phoneCarrier):
        if len(phoneCarrier) == 0:
            self._phoneCarrier = False
        else:
            self._phoneCarrier = phoneCarrier

    @property
    def notify_by_email(self):
        """This function acts as get/set for _notifyByEmail
        
        :getter: Returns this _notifyByEmail (true or false).
        :setter: Sets this _notifyByEmail (Passed in value is boolean 1 or 0, and is set to True or False respectively).
        :type: bool.
        """
        return self._notifyByEmail
    
    @notify_by_email.setter
    def notify_by_email(self, notifyByEmail):
        if notifyByEmail == 0:
            self._notifyByEmail = False
        else:
            self._notifyByEmail = True

    @property
    def notify_by_phone(self):
        """This function acts as get/set for _notifyByPhone
        
        :getter: Returns this _notifyByPhone (true or false).
        :setter: Sets this _notifyByPhone (Passed in value is boolean 1 or 0, and is set to True or False respectively).
        :type: bool.
        """
        return self._notifyByPhone
    
    @notify_by_phone.setter
    def notify_by_phone(self, notifyByPhone):
        if notifyByPhone == 0:
            self._notifyByPhone = False
        else:
            self._notifyByPhone = True

    def setAll(self, userId, userName, phoneNumber, emailAddress, phoneCarrier, notifyByEmail, notifyByPhone):
        """This function is used to quickly set all fields of the class.

        :param userId: Id value of User
        :type name: str.
        :param userName: Name of the User
        :type state: bool.
        :param phoneNumber: Phone number of User
        :type name: str.
        :param emailAddress: Email address of User
        :type name: str.
        :param phoneCarrier: Phone carrier that is connected with phone number of User. 
        :type name: str.
        :param notifyByEmail: Int value of 1 or 0 to represent true or false for notifyByEmail.
        :type name: int
        :param notifyByPhone: Int value of 1 or 0 to represent true or false for notifyByPhone.
        :type name: int
        """
        self.user_id = userId
        self.user_name = userName
        self.phone_number = phoneNumber
        self.email_address = emailAddress
        self.phone_carrier = phoneCarrier
        self.notify_by_email = notifyByEmail
        self.notify_by_phone = notifyByPhone

    def __eq__(self, other):
        """This function compares other UserInfo objects by its user_id class variable.

        :param other: UserInfo object that will be compared with this UserInfo object.
        :type name: UserInfo.
        """
        
        return self.user_id == other.user_id

    def __str__(self):
        """This function is the UserInfo's 'toString' method used primarily for log file.
           Ex: UserInfo -> userId: 124, userName: Chuck, phoneNumber: 2313321, phoneCarrier: Verizon, true, false

        :returns:  string -- The toString that contains all userInfo of instance.
        """
        return "UserInfo -> userId: {}, userName: {}, phoneNumber: {}, emailAddress: {}, phoneCarrier: {}, notifyByEmail: {}, notfiyByPhone: {}".format(\
            self.user_id, self.user_name, self.phone_number, self.email_address, self.phone_carrier, self.notify_by_email, self.notify_by_phone)