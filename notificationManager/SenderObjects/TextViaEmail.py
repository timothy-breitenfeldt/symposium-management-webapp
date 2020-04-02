import smtplib
import os
import enum


"""
Providers
====================================
The core module of my example project
"""

class Providers(enum.Enum):
    """
    Providers
    ====================================
    The core module of my example project
    """
    verizon = "@vtext.com"                # "verizon"
    metro_pcs = "@metropcs.sms.us"        # "metro pcs"
    nextel = "@messaging.nextel.com"      # "nextel"
    sprint = "@messaging.sprintpcs.com"   # "sprint"
    t_mobile = "@tmomail.net"             # "t-mobile"
    u_s__cellular = "@email.uscc.net"     # "u.s. cullular"
    at_t = "@txt.att.net"                 # "at&t"
    virgin_mobile = "@vtext.com"          # "virgin mobile"
    tracfone = "@mmst5.tracfone.com"      # "tracfone"
    ting = "@message.ting.com"            # "ting"
    boost_mobile = "@myboostmobile.com"   # "boost mobile"

    @staticmethod
    def get_provider_extension(provider_name):
        formatted_provider_name = Providers.provider_format(provider_name)
        return Providers[formatted_provider_name].value

    @staticmethod
    def provider_format(original_provider_name):
        new_provider_name = list(original_provider_name.lower())
        illegal_chars = ["&", " ", ".", "-"]
        for index in range(len(original_provider_name)):
            if illegal_chars.__contains__(original_provider_name[index]):
                new_provider_name[index] = "_"
        return "".join(new_provider_name)


class TextViaEmail(object):

    @staticmethod
    def send_email(phone_number, provider_name, body):
        email = os.environ.get('SENDER_EMAIL')
        password = os.environ.get('SENDER_EMAIL_PASSWORD')
        server_address = os.environ.get('SENDER_EMAIL_ADDRESS')
        server_port_number = os.environ.get('SENDER_EMAIL_VIA_TEXT_PORT_NUMBER')

        sms_gateway = str(phone_number) + Providers.get_provider_extension(provider_name)
        message = body

        server = smtplib.SMTP(server_address, server_port_number)
        server.starttls()
        server.login(email, password)
        server.sendmail(email, sms_gateway, message)
        server.quit()

if __name__ == "__main__":
    #test
    TextViaEmail.send_email(os.environ.get('TEST_PHONE_NUMBER'), "verizon", "Clark kent is SUPERMAN!!!")