I don't like texting my friends. I have a few specific problems with it:

1. When you send a text, you expect a response back. If you don't get one, and you want to send the same friend another update, you have to send the dreaded Double Text, a fate too embarassing for some to even endure. So there's a tendency to only text things you think warrant a response.
2. The response back can be immediate, so the expectation is that it should be. But responding to a text immediately starts a Text Conversation which you may not be ready for. Plus, they're not very fun: typing is slower than talking, so you spend a lot of time waiting for three typing dots to materialize into a message when you could be using your handheld dopamine machine for something more "rewarding" (in the Pavlovian sense).
3. Avoiding a Text Conversation means not responding to a text for a few hours or days, which starts what can be a days-long game of ping pong where you volley messages back and forth until one falls off the table, usually well after the initial message has lost its relevance.
4. Text notifications get mixed into the soup of phone notifications, which, if your friends haven't taken great pains to silence them, can make it nearly impossible to be heard over the noise.

All of these things make texting my friends feel a little bit like eating greek yoghurt: I know it's good for me to do, and sometimes I feel better after doing it, but at a fundamental level, I just don't enjoy it very much. It takes a surprising amount of effort for disappointingly little benefit. Calling is better, but has its own set of problems; with time zones and schedules, it's so hard to coordinate that I usually end up forgetting what I wanted to say by the time we get on the phone.

Going into our year away, I knew about this limitation of mine and wanted to take steps to get ahead of it. We started a monthly newsletter which has been so, so fun to write, but a lot of detail gets lost when you try to condense a month's worth of updates into an email. What I wanted was a way to send mundane, quotidian updates, with no expectation of an immediate response or pressure to start a conversation. I wanted it to be easy enough that I could do often while being joyful enough that it didn't get annoying on the receiving side.

## The 00s are back, baby

What's old is new again: as new generations rediscover older technologies, things that became outdated can see a kind of resurgence. We've seen this with analog tech that had been supplanted by digital: vinyl and film cameras have experienced small renaissances recently. And even early digital era technology is starting to make a niche comeback with people starting to reach for "dumb phones" again after years of smartphone dominance.

In this environment, why shouldn't fax machines become cool again? Maybe because they were never cool in the first place. Like Blackberries, fax machines found their niche making things Efficient for Business, and their legacy is inextricably linked to the Office Space aesthetic. But there is a kernel of cool to fax machines. You can scribble anything on a piece of paper and have it print on someone else's fax machine, instantly. You can write a note. You can draw a map. You can play tic-tac-toe. Maybe if they didn't cost $10,000 and weigh 2 tonnes, people would have used them for something other than sending legal documents back and forth.

To me, faxes have some elements that are better than texting: they're instant but don't demand an instant response, and they don't get lost in the rest of the digital noise. Yes, they're bulky and expensive and uncool, but in an age where everything is digital, there's novelty in having something in the real world, something that makes noises and that you can feel in your hands.

## "Faxing" your friends in the 21st century

During my last dinner out in NYC with my friends Wes and Alec, we talked about all of this and more. But what would be the best way to make this happen? Rather than use an actual fax machine (bulky, expensive, poor international story), we decided to use Bluesky, which has a free, well-documented API, for publishing. For receiving updates,  I got hooked on the idea of using a thermal printer (the kind used for receipts). I like the fact that it's more compact than a printer, and for this project, the low fidelity is a feature, not a bug. Wes had a Raspberry Pi laying around to help us connect the two.

#### Wes please help me with the tech details here

We bought a QR204 printer and got to work connecting it to a Raspberry Pi during a remote pair programming session. The printer has a serial interface, but it also connects to the Pi via USB. 

I forget what we used for power: did we need the 2-pin adapter? https://www.amazon.com/dp/B09W96X88K?psc=1&smid=AY2TQVMLRNMSP&ref_=chk_typ_imgToDp

We messed around with CUPS and drivers for a while before realizing that our printer had a serial port that you could just write to:

```echo -e "This is a test.\\n\\n\\n" > /dev/usb/lp0```

After getting it to print for the first time, there was a lot of excited shouting; to that point, we were only about 60% confident it would work at all. After that, we found a [python library](https://python-escpos.readthedocs.io/en/latest/) for interacting with receipt printers and connected it to the Bluesky API. This gets polled for updates every few minutes, checking to see if anything new has been posted since the most recent print.

Now, every day, I post an update to Bluesky with a picture attached, and it prints in horrifying quality in Wes' apartment. He then tears it off, reads it (presumably), and impales it on the receipt stake. Communication is one-way only, the implicit assumption being that my life is more interesting than his (just kidding, I'm just moving around too much to make carrying around a printer, even a small one, practical.). We've done this for over 6 months now and he probably knows more about my life now than he ever did when we were living in the same city.

## Resources
* https://cdn-learn.adafruit.com/downloads/pdf/mini-thermal-receipt-printer.pdf
