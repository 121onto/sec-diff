SEC Diff
=========

![Alt text](/public/Screenshot.png?raw=true "Bazzarvoice, Inc.")

SEC Diff uses Wikipedia's diff engine to render diffs of SEC filings form one period to the next.  The tool is useful for uncovering subtle changes to corporate strategy that management does not address during conference calls.

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
will download these files, convert them into plaintext, and fire up an expressjs
instance on your local machine

```bash
node app.js \
  -n https://www.sec.gov/Archives/edgar/data/1330421/000119312515235103/d929871d10k.htm \
  -o https://www.sec.gov/Archives/edgar/data/1330421/000119312514251125/d698757d10k.htm
```

If you've already run this comman once successfully, you don't need to parse
the filings every time to launch the app.  Instead, you may run:

```bash
node app.js -l true
```

When you see `Server is running on port 3000` in your console, navigate over to `http://localhost:3000/`
to view your diff.  The script will take a few seconds to load, depending on the size of
your SEC filings.

**Note**: It is recommended that you modify node-html-to-text so that it ignores tables
as tables generally include data from multiple years.
