import os
import smtplib
import imghdr
from email.message import EmailMessage

"""
SenderObjects.EmailNotification
====================================
The core module of my example project
"""

class EmailNotification:
    """
    SenderObjects.EmailNotification
    ====================================
    The core module of my example project
    """

    def __init__(self):
        """fafaf[DVC Constructor]
        """

        """This function does something Maybve.

        """
        self._sender_email = os.environ.get('SENDER_EMAIL')
        self._sender_email_password = os.environ.get('SENDER_EMAIL_PASSWORD')
        self._server_address = os.environ.get('SENDER_EMAIL_ADDRESS')
        self._server_port_number = os.environ.get('SENDER_EMAIL_PORT_NUMBER')

    @property
    def sender_email(self):
        """This function does something Maybve.

        :param name: The name to use.
        :type name: str.
        :param state: Current state to be in.
        :type state: bool.
        :returns:  string -- The email address of the host/sender.
        """
        return self._sender_email

    @sender_email.setter
    def sender_email(self, sender_email_new):
        """[Receives and sets EmailNotifcation object's email to the received email string.]
        
        Arguments:
            sender_email_new {[type]} -- [description]
        """
        self._sender_email = sender_email_new

    @sender_email.deleter
    def sender_email(self):
        """[summary]
        """
        del self._sender_email

    @property
    def sender_email_password(self):
        """[summary]
        
        Returns:
            [type] -- [description]
        """
        return self._sender_email_password

    @sender_email_password.setter
    def sender_email_password(self, sender_email_password_new):
        """Sets the password of the host/sender's email acccount.
        
        Arguments:
            sender_email_password_new {string} -- Password to be set as new password for email account.
        """
        self._sender_email_password = sender_email_password_new

    @sender_email_password.deleter
    def sender_email_password(self):
        """[summary]
        """
        del self._sender_email_password

    @property
    def server_address(self):
        """[summary]
        
        Returns:
            [type] -- [description]
        """
        return self._server_address

    @property
    def server_port_number(self):
        """[summary]
        
        Returns:
            [type] -- [description]
        """
        return self._server_port_number


    def send_email(self, reciever_email, body, subject):
        """Sends email using the passed in email address (reciever_email) along with the body and subject of the email.
        
        Arguments:
            reciever_email {string} -- [Email address to be sent to.]
            body {[type]} -- [Body of email that will be attached to email object before sending.]
            subject {[type]} -- [Subject of email that will be attached to email object before sending.]
        """
        msg = EmailMessage()

        msg['Subject'] = subject
        msg['From'] = self.sender_email
        msg['To'] = reciever_email

        msg.set_content(body)

        with smtplib.SMTP_SSL(self._server_address, self._server_port_number) as server:
            server.login(self.sender_email, self.sender_email_password)
            server.send_message(msg)


if __name__ == "__main__":
    #test
    emailNotify = EmailNotification()
    emailNotify.send_email(os.environ.get("TEST_EMAIL"), "Testing Email Subject!", "Testing Email Body")


# 'HTML BODY EXAMPE
# msg.add_alternative("""
# <!DOCTYPE html>
# <html>
# <body>
# <h1>HI</h1>
# <h6>Bye</h6>
# </body>
# </body>
# """, subtype='html')

# 'msg['To'] = [self.sender_email, "Chestersouthwood.gmail.com", "lilchedder13@gmail.com"]
# 'Can send to multiple emails without looping, may be handy for 'emergency' messages or changes

# 'attach photo and pdf example
# 'can submit any list of pics, and any list of documents, but not both list combined at once

#'Image(s)

#msg.set_content("Image attached")

'''
files = ['randomCat.png', 'randomCat2.png']
for file in files:
    with open(file, 'rb') as f:
        file_data = f.read()
        file_type = imghdr.what(f.name)
        file_name = f.name
'''

#' msg.add_attachment(file_data, maintype='image', subtype=file_type)
#    msg.add_attachment(file_data, maintype='image', subtype=file_type, filename=file_name)

#'File(s)

# msg.set_content("Image attached")
#
# files = ['plain.txt', 'plain2.pdf']
# for file in files:
#     with open(file, 'rb') as f:
#         file_data = f.read()
#         file_type = imghdr.what(f.name)
#         file_name = f.name
#
#     msg.add_attachment(file_data, maintype='application', subtype='octet-stream', filename=file_name)