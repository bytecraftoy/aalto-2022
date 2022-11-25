### Example usage of dummy

POST http://localhost:8080 HTTP/1.1
content-type: application/json

{
"model": "text-davinci-002",
"prompt": "Example",
"temperature": 0.8,
"max_tokens": 600,
"top_p": 1.0,
"presence_penalty": 0.0,
"frequency_penalty": 0.5
}

should return something like:

{
"id": "cmpl-6GPcxsbbyArg1MZFDVi8fQ8Dnbv3a",
"object": "text_completion",
"created": 1669372033099,
"model": "text-davinci-002",
"choices": [
{
"text": "\n\nThe hero's name is Arthur. He was born into a noble family and raised to be a knight. When he was sixteen, his parents were killed by a dragon. Arthur vowed to avenge their deaths, and set out to find the dragon.\n\nHe searched for years, but could never find it. Finally, he came across a wizard who told him that the only way to kill the dragon was with a magical flaming sword. The wizard gave Arthur the sword and told him to use it wisely.\n\nArthur went back to the dragon's lair and confronted it. The dragon breathed fire at him, but Arthur dodged out of the way and thrust his sword into the dragon's heart. As the dragon died, Arthur felt the magic of the sword flow into him, giving him strength and power.",
"index": 0,
"logprobs": null,
"finish_reason": "stop"
}
],
"usage": {
"prompt_tokens": 17,
"completion_tokens": 164,
"total_tokens": 181
}
}

Which is what OpenAI would give. The typescript object format for it can be found in src/types/AIResponse.ts
