chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (!tabs || !tabs.length) {
    document.getElementById('result').textContent = '활성 탭을 찾을 수 없습니다.';
    return;
  }
  const activeTab = tabs[0];
  const url = activeTab.url;

  if (url.startsWith('https://www.acmicpc.net/problem/step/')) {
    chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      func: extractBaekjoonContent
    }, (injectionResults) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        document.getElementById('result').textContent = chrome.runtime.lastError.message;
        return;
      }
      const result = injectionResults[0].result;
      if (typeof result === 'string' && result.startsWith('Error:')) {
        document.getElementById('result').textContent = result;
        return;
      }
      const turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '---',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced'
      });
      turndownService.use(turndownPluginGfm.gfm);

      const markdown = turndownService.turndown(result);
      document.getElementById('result').textContent = markdown;
    });
  }
  else if (url.startsWith('https://swexpertacademy.com/main/code/')) {
    chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      func: extractSweaContent
    }, (injectionResults) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        document.getElementById('result').textContent = chrome.runtime.lastError.message;
        return;
      }
      const result = injectionResults[0].result;
      if (typeof result === 'string' && result.startsWith('Error:')) {
        document.getElementById('result').textContent = result;
        return;
      }
      const turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '---',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced'
      });
      turndownService.use(turndownPluginGfm.gfm);

      const markdown = turndownService.turndown(result);
      document.getElementById('result').textContent = markdown;
    });
  }
  else if (url.startsWith('https://school.programmers.co.kr/learn/courses/30/lessons/')) {
    chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      func: extractProgrammersContent
    }, (injectionResults) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        document.getElementById('result').textContent = chrome.runtime.lastError.message;
        return;
      }
      const result = injectionResults[0].result;
      if (typeof result === 'string' && result.startsWith('Error:')) {
        document.getElementById('result').textContent = result;
        return;
      }
      const turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '---',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced'
      });
      turndownService.addRule('h6', {
        filter: 'h6',
        replacement: function(content) {
          return '## ' + content + '\n\n';
        }
      })
      turndownService.addRule('h5', {
        filter: 'h5',
        replacement: function(content) {
          return '## ' + content + '\n\n';
        }
      })
      turndownService.use(turndownPluginGfm.gfm);

      const markdown = turndownService.turndown(result);
      document.getElementById('result').textContent = markdown;
    });
  }

  else {
    document.getElementById('result').textContent = '문제 페이지에서만 사용할 수 있습니다.';
    return;
  }


  document.getElementById('copy-btn').addEventListener('click', () => {
    const markdownText = document.getElementById('result').textContent;
    navigator.clipboard.writeText(markdownText)
      .then(() => {
        const info = document.getElementById('copy-info');
        info.textContent = ' 클립보드에 복사되었습니다.';
        setTimeout(() => {
          info.textContent = '';
        }, 3000);
      })
      .catch(err => {
        console.error('복사 실패:', err);
        const info = document.getElementById('copy-info');
        info.textContent = ' 복사 실패했습니다.';
        setTimeout(() => {
          info.textContent = '';
        }, 3000);
      });
  });
});

function extractBaekjoonContent() {
  const title = document.title.trim()

  let htmlContent = `<h1>${title}</h1>`;

  const sections = Array.from(
    document.querySelectorAll('div.content div.row div#problem-body section')
  ).filter(section => getComputedStyle(section).display !== 'none');

  sections.forEach(section => {
    // section 내부의 모든 button 요소를 선택 후 제거
    section.querySelectorAll('button').forEach(button => button.remove());
  });

  if (!sections || sections.length === 0) {
    return 'Error: 선택한 요소들을 찾을 수 없습니다.';
  }

  sections.forEach((section) => {
    htmlContent += section.outerHTML;
  });

  return htmlContent;
}

function extractSweaContent() {
  const title = document.querySelector('p.problem_title').innerText.trim();

  let htmlContent = `<h1>${title}</h1>`;

  const divs = Array.from(
    // should select div.box4 and div.box_type1
    document.querySelectorAll('div.tabcon_wrap div.box4,div.box_type1')
  ).filter(section => getComputedStyle(section).display !== 'none');

  divs.forEach(div => {
    // div 내부의 input.txt, output.txt 클릭 요소 제거
    div.querySelectorAll('div.down_area').forEach(button => button.remove());
  });

  if (!divs || divs.length === 0) {
    return 'Error: 선택한 요소들을 찾을 수 없습니다.';
  }

  divs.forEach((section) => {
    htmlContent += section.outerHTML;
  });

  return htmlContent;
}

function extractProgrammersContent() {
  const title = document.querySelector('span.challenge-title').innerText.trim();
  const id = document.querySelector('div.lesson-content').getAttribute('data-lesson-id').trim();

  let htmlContent = `<h1>${id}번: ${title}</h1>`;

  const divs = Array.from(
    // should select div.guide-section-description
    document.querySelectorAll('div.guide-section-description')
  ).filter(section => getComputedStyle(section).display !== 'none');

  if (!divs || divs.length === 0) {
    return 'Error: 선택한 요소들을 찾을 수 없습니다.';
  }

  divs.forEach((section) => {
    htmlContent += section.outerHTML;
  });

  return htmlContent;
}

