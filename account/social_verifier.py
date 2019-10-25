import requests

class SocialVerifier:
    @staticmethod
    def checkToken(provider,access_token,user_id):
        if provider == "Facebook":
            # Facebook-api-endpoint
            URL = "https://graph.facebook.com/me" 
            PARAMS = {'access_token':access_token} 
            r = requests.get(url = URL, params = PARAMS) 
            data = r.json()
            #print(data)
            if 'id' not in data:
                return False
            else:            
                return True
        elif provider == "Google":
            # Google-api-endpoint
            URL = "https://www.googleapis.com/oauth2/v1/tokeninfo" 
            PARAMS = {'access_token':access_token} 
            r = requests.get(url = URL, params = PARAMS) 
            data = r.json()
            if 'user_id' not in data:
                return False
            else:            
                return True
        else:
            raise Exception('SocialVerifier::checkToken::>>wrong validation parameters')
