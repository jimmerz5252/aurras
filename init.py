# Notes:

# Latency solutions.
# wit ai imposes a 600 rate per minute limit on each application.

# Google doesnt do well with a conversation.

# 

import speech_recognition as sr
import requests
import json
import asyncio
import websockets
import time


r = sr.Recognizer()
mic = sr.Microphone()
witKey = "GIZ7ZM3PMBTGJWV5DKRVAQ7OCZBCASZI"
contextualWebUrl = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI"
contextualWebHeaders = {
    'x-rapidapi-host': "contextualwebsearch-websearch-v1.p.rapidapi.com",
    'x-rapidapi-key': "007c498ea4msh1774778ff8fa89bp11299cjsnca8cd0b66e4a"
}
contextualWebQuerystring = {"autoCorrect":"true","pageNumber":"1","pageSize":"10","q":"","safeSearch":"false"}
# We need to grab the source from the microphone.

response = {
    "success": True,
    "error": None,
    "transcription": None
}

# We need to have a filereader so we can update the fron end.
# Rate Limiting is done through the api. We just error.

# This waits until we have a socket connection.


	


async def ingestor(websocket, path):

	start = int(round(time.time() * 1000))
	print("Log Init", getTimeSince(start))

	with mic as source:
		# We train the model.
		# r.adjust_for_ambient_noise(source)
		

		while True:
			
			r.adjust_for_ambient_noise(source)
			print("Log Init Ambient Noise", getTimeSince(start))
			
			audio = r.listen(source)
			print("Log Init Listen", getTimeSince(start))

			try:
				response["transcription"] = r.recognize_wit(audio, witKey, show_all=True)
				# response["transcription"] = r.recognize_google(audio, show_all=True)

				# Problem 1: This is grabbing too much data. We need to take snapshots.
				# We need to refactor this to be asynch.

				print("Log Recognizer ", getTimeSince(start))
				
				
				if type(response["transcription"]) != str:
					print(response)
					print("Errrrrrr Transcription Issues")
					continue

				if response["transcription"] == "":
					print("Errrrrrr No Speech")
					continue

				contextualWebQuerystring["q"] = response["transcription"].strip()
				print("Log Post ARequest", getTimeSince(start), "querying: " + response["transcription"])

				contextualSearchResponse = requests.request("GET", contextualWebUrl, headers=contextualWebHeaders, params=contextualWebQuerystring)
				contextualSearchResponseJSON = json.loads(contextualSearchResponse.text)

				print("Log Post CRequest", getTimeSince(start))

				# Let's send this to our socket.
				# await websocket.send(contextualSearchResponseJSON)
				
				# Dump the whole json into a file.
				await websocket.send(contextualSearchResponse.text)
				
				file = 'view/search_result.json'
				with open(file, 'w') as filetowrite:
					filetowrite.write(contextualSearchResponse.text)

				# Different ways to get the data we need.
				# response["transcription"] = r.recognize_sphinx(audio)
				
			except sr.RequestError:
				print("Errrrr Request")
			except sr.UnknownValueError:
				print("Unable to recognize speech")

# async def commander(websocket, path):

# 	r.adjust_for_ambient_noise(source)
# 	audio = r.listen(source)

# 	start = int(round(time.time() * 1000))

# 	while True:
# 		print("Log", getTimeSince(start))
# 		with mic as source:
# 			print("Log", getTimeSince(start))

# 			await websocket.send("{Ack}")


def getTimeSince(ms):
	return int(round(time.time() * 1000)) - ms

# Ingestor.
ingestor_server = websockets.serve(ingestor, 'localhost', 8765)
asyncio.get_event_loop().run_until_complete(ingestor_server)
asyncio.get_event_loop().run_forever()

# Commandor, used to fine tailor content.
commander_server = websockets.serve(commander, 'localhost', 8666)
asyncio.get_event_loop().run_until_complete(commander_server)
asyncio.get_event_loop().run_forever()