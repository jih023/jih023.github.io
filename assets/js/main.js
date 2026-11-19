(function () {
  var root = document.documentElement;

  /* 다크모드 */
  var toggle = document.querySelector('.theme-toggle');
  if (toggle) toggle.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  /* 모바일 사이드바 */
  var menuBtn = document.querySelector('.menu-btn');
  var mask = document.querySelector('.sidebar-mask');
  var closeMenu = function () { document.body.classList.remove('sidebar-open'); };
  if (menuBtn) menuBtn.addEventListener('click', function () { document.body.classList.toggle('sidebar-open'); });
  if (mask) mask.addEventListener('click', closeMenu);

  /* 오른쪽 목차 (h2, h3) */
  var article = document.querySelector('.post-content');
  var toc = document.querySelector('.toc');
  if (toc && article) {
    var heads = article.querySelectorAll('h2, h3');
    if (!heads.length) { toc.remove(); }
    else {
      var list = toc.querySelector('.toc-list');
      var links = [];
      heads.forEach(function (h, i) {
        if (!h.id) h.id = 'section-' + (i + 1);
        var a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent;
        a.className = 'toc-' + h.tagName.toLowerCase();
        list.appendChild(a);
        links.push(a);
      });
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (!e.isIntersecting) return;
            links.forEach(function (l) { l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id); });
          });
        }, { rootMargin: '-70px 0px -70% 0px' });
        heads.forEach(function (h) { io.observe(h); });
      }
    }
  }

  /* 코드 블록: 언어 표시 + 복사 버튼 */
  document.querySelectorAll('.prose div.highlighter-rouge').forEach(function (block) {
    var m = (block.className || '').match(/language-(\w+)/);
    var head = document.createElement('div');
    head.className = 'code-head';
    head.innerHTML = '<span class="code-lang"></span><button type="button" class="code-copy">복사</button>';
    head.querySelector('.code-lang').textContent = m ? m[1] : '';
    block.insertBefore(head, block.firstChild);
    head.querySelector('.code-copy').addEventListener('click', function (ev) {
      var btn = ev.currentTarget;
      var code = block.querySelector('code');
      if (!navigator.clipboard || !code) return;
      navigator.clipboard.writeText(code.innerText).then(function () {
        btn.textContent = '복사됨';
        setTimeout(function () { btn.textContent = '복사'; }, 1400);
      }, function () {});
    });
  });

  /* 검색 */
  var input = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  var body = document.getElementById('page-body');
  if (input && results && body) {
    var data = null;
    var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
    var load = function () {
      if (data) return Promise.resolve(data);
      if (window.__SEARCH_DATA__) { data = window.__SEARCH_DATA__; return Promise.resolve(data); }
      return fetch(input.getAttribute('data-src')).then(function (r) { return r.json(); }).then(function (d) { data = d; return d; });
    };
    var render = function () {
      var q = input.value.trim().toLowerCase();
      if (!q) { results.hidden = true; body.hidden = false; return; }
      load().then(function (items) {
        var hits = items.filter(function (p) {
          return (p.title + ' ' + p.content + ' ' + p.tags + ' ' + p.categories).toLowerCase().indexOf(q) > -1;
        });
        results.querySelector('.search-count').textContent = '"' + input.value.trim() + '" 검색 결과 ' + hits.length + '개';
        results.querySelector('.search-list').innerHTML = hits.map(function (p) {
          var i = p.content.toLowerCase().indexOf(q);
          var snip = i > 40 ? '…' + p.content.slice(i - 40, i + 120) : p.content.slice(0, 160);
          return '<a class="search-hit" href="' + esc(p.url) + '"><strong>' + esc(p.title) + '</strong><span>' + esc(snip) + '</span><small>' + esc(p.date) + (p.categories ? ' · ' + esc(p.categories) : '') + '</small></a>';
        }).join('');
        results.hidden = false; body.hidden = true;
      });
    };
    input.addEventListener('input', render);
    input.addEventListener('keydown', function (e) { if (e.key === 'Escape') { input.value = ''; render(); } });
  }

  /* "새 글 쓰기" → GitHub 새 파일 화면을 오늘 날짜 + 기본 양식으로 */
  var np = document.getElementById('new-post');
  if (np) {
    var d = new Date();
    var p = function (n) { return String(n).padStart(2, '0'); };
    var day = d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
    var template = [
      '---',
      'title: "제목을 입력하세요"',
      'date: ' + day + ' ' + p(d.getHours()) + ':' + p(d.getMinutes()) + ':00 +0900',
      'categories: [Blog]',
      'tags: []',
      'description: "목록에 보일 한두 줄 요약"',
      '---',
      '',
      '여기에 본문을 마크다운으로 쓰면 돼요.',
      ''
    ].join('\n');
    np.href += '?filename=' + encodeURIComponent(day + '-new-post.md') + '&value=' + encodeURIComponent(template);
    np.target = '_blank';
    np.rel = 'noopener';
  }
})();
