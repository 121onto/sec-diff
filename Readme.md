SEC Diff
=========

![Alt text](/public/Screenshot.png?raw=true "Bazzarvoice, Inc.")

SEC Diff uses Wikipedia's diff engine to render diffs of SEC filings
from one period to the next. The tool is useful for uncovering subtle changes
in corporate strategy that management may not mention elsewhere.  Lean more about
Wikipedia's diff algorithm [here](https://en.wikipedia.org/wiki/User:Cacycle/diff).

Install
-------

1. Download ZIP file from GitHub (see link to the right titled "Download ZIP").
2. Unzip into directory
3. cd into directory and `npm install`

Usage
-----

Go to the SEC website and grab the url for a filing from two different time
periods.  For example, the following two urls link to BazaarVoice's form 10-K
filed in 2015 and 2014, respectively:

- https://www.sec.gov/Archives/edgar/data/1330421/000119312515235103/d929871d10k.htm
- https://www.sec.gov/Archives/edgar/data/1330421/000119312514251125/d698757d10k.htm

Navigate into the root directory for your install.  The following command
will download the filings, convert them into plaintext, and fire up an expressjs
instance on your local machine (n stands for new, o stands for old):

```bash
node app.js \
  -n https://www.sec.gov/Archives/edgar/data/1330421/000119312515235103/d929871d10k.htm \
  -o https://www.sec.gov/Archives/edgar/data/1330421/000119312514251125/d698757d10k.htm
```

When you see `Server is running on port 3000` in your console, navigate over to `http://localhost:3000/`
to view your diff.  The script takes a few seconds to load, depending on the size of
your SEC filings.

Notes
-----

Diffing tables may be unecessary because tables generally include data for multiple years.
Modifying node-html-to-text to ignore tables is not difficult.

You don't need to parse the filings every time to launch the app.
If you've run this command successfully already you may run:

```bash
node app.js -l true
```
