import asyncio
import websockets

async def consumer_handler(websocket, path):
	with open("view/search_result.json", "r") as f:
			await websocket.send(f.read())

start_server = websockets.serve(consumer_handler, 'localhost', 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()