import requests
from bs4 import BeautifulSoup
from markdownify import markdownify as md
from urllib.parse import urlparse
import os

url = input('프로그래머스 사이트 문제 URL 입력: ')
parsed_url = urlparse(url)

if parsed_url.hostname != 'programmers.co.kr':
    print('프로그래머스 사이트만 입력가능합니다.')
    quit()

response = requests.get(parsed_url.geturl())

if response.status_code == 200:
    html = response.text
    soup = BeautifulSoup(html, 'html.parser')
    
    title = soup.select_one('#tab > li').text.strip()
    question = str(soup.select_one('#tour2 > div'))
    
    filename = 'README.md'
    f = open(filename, 'w')
    
    print(f'문제이름: {title}')
    f.write(f'## [{title}]({url})\n')
    f.write(md(question)
            .replace('###### ', '### ')
            .replace('##### ', '### '))
    print(f'{os.path.join(os.getcwd(), filename)} 저장완료')
    f.close()
    
else:
    print(f'{response.status_code} 에러')