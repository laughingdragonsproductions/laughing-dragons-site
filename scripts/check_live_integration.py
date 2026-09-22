import re
import urllib.request

PUB = "pub-7048606415692002"

def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "LDP-Integration-Check/1.0"})
    with urllib.request.urlopen(req, timeout=25) as r:
        return r.read().decode("utf-8", errors="ignore")

def slots(body):
    out = {}
    for k in ("header", "footer", "inContent"):
        m = re.search(rf'{k}:\s*"(\d*)"', body)
        out[k] = m.group(1) if m and m.group(1) else ""
    return out

def words(html):
    t = re.sub(r"<script[\s\S]*?</script>", " ", html, flags=re.I)
    t = re.sub(r"<[^>]+>", " ", t)
    return len(re.findall(r"\w+", t))

def main():
    for site, url in (
        ("LD", "https://laughing-dragons.com/assets/js/config.js"),
        ("TAG", "https://theassociatedguess.com/assets/js/config.js"),
        ("1947", "https://them1947.com/assets/js/config.js"),
    ):
        s = slots(fetch(url))
        print(f"{site} slots: header={s['header'] or '-'} footer={s['footer'] or '-'} inContent={s['inContent'] or '-'}")

    for site, url in (
        ("LD", "https://laughing-dragons.com/ads.txt"),
        ("TAG", "https://theassociatedguess.com/ads.txt"),
        ("1947", "https://them1947.com/ads.txt"),
    ):
        ok = PUB in fetch(url)
        print(f"{site} ads.txt: {'OK' if ok else 'MISSING'}")

    sm = fetch("https://theassociatedguess.com/sitemap.xml")
    print(f"TAG sitemap article URLs: {len(re.findall(r'<loc>https://theassociatedguess.com/article/', sm))}")

    thin = fetch("https://theassociatedguess.com/article/alien-sausage/")
    print(f"TAG sample thin article noindex: {'noindex' in thin.lower()}")

    term = fetch("https://laughing-dragons.com/games/terminal/")
    print(f"LD terminal crawlable words: {words(term)} | game-landing: {'game-landing' in term}")

    case = fetch("https://them1947.com/files/prints/them-1947-roswell-grey-disclosure-day-alien/")
    print(f"1947 case file crawlable words: {words(case)} | brief: {'case-crawler-brief' in case}")

if __name__ == "__main__":
    main()
