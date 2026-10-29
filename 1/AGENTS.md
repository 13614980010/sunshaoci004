# AGENTS.md

Personal Chinese-language coursework archive for 高级网页设计 (student 孙绍词). Hand-written static HTML/CSS/JS: no package manager, build, tests, lint, CI, or dev server. Each page opens directly in a browser; no modules/fetch/bundler.

## Hard conventions (from `ssc_prompt.md`)

- `ssc_prompt.md` is an append-only prompt log. Before executing each new user prompt, append a record (timestamp, model, prompt text); never overwrite earlier records.
- Prefix new CSS classes, IDs, and JS variables/functions with `ssc_`; CSS variables use `--ssc_*`. Older exercise/starter files predate this rule — do not mass-rename them, but apply the prefix in new or edited code.
- Register every new page in `index.html`'s 课堂目录 with a new card and `./page.html` link. The `iconfont-*.html` pages and `form.html` also link back to `./index.html`.
- `index.html` uses inline CSS only, no CDN, and must keep the original prompt text inside the 本页任务 block. Its "已收录 N 个页面" count is manually maintained and already stale — update it when adding pages.
- UI copy is Chinese; newer pages use `lang="zh-CN"`.

## Layout and assets

- Root holds exercise pages + matching CSS where present (`stack.html`/`stack.css`, etc.); `index.html` is the catalog.
- `starter/` is the current grade-analysis JS assignment: `starter-level1-0806-s.html`, `starter-level2-0806-s.html`, plus required `starter/data.js`; `target.html` is referenced in comments but not included.
- Root `starter-level1.html` is a stale duplicate: stray `m` before the doctype, older TODO version, and loads a `data.js` that only exists in `starter/`. Edit `starter/` copies instead.
- Vendor assets are local: `cdn/fontawesome/` (font icons), `cdn/lucide/` (SVG icons), `font_5238940_d3fxv615wg4/` (iconfont package), `img/`. Do not swap in remote CDNs. Known exception: `svg.html` loads `at.alicdn.com`.
- `style.css` and `self.css` are duplicates; other pages use same-named CSS. Do not assume one shared global stylesheet.
- `frontend-design/SKILL.md` holds the local visual-design guidance used for the iconfont pages; read it for aesthetic work.

## Verifying and filesystem

- No test/lint/build commands exist. Verify by opening the changed page in a browser and checking the console; `dataTyp.html` and `js_obj_fun.html` are console-only JS demos.
- Use the editor tools for file changes. PowerShell 5.1 `Set-Content`/`Out-File` default encodings corrupt the Chinese text in these UTF-8 files.
- The directory is not currently a git repo (`.git` absent) even though `ssc_prompt.md` mentions Gitee; do not assume git remotes or push automatically.
