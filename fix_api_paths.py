import os
import re

files = [
    'src/lib/store.js',
    'src/lib/components/Analysis/ModalController.svelte',
    'src/routes/(app)/new/+page.svelte',
    'src/routes/(app)/game/+page.svelte',
    'src/lib/utils/fetchers.js'
]

for fp in files:
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()

    # Prepend import { base } from '$app/paths'
    if 'from \'$app/paths\'' not in content:
        # If it's a Svelte file, put it inside <script>
        if '<script>' in content:
            content = content.replace('<script>', '<script>\n  import { base } from \'$app/paths\'\n', 1)
        elif '<script lang="ts">' in content:
            content = content.replace('<script lang="ts">', '<script lang="ts">\n  import { base } from \'$app/paths\'\n', 1)
        # If it's a JS file, put it at the top
        else:
            content = 'import { base } from \'$app/paths\'\n' + content

    # Replace `fetch('/api/...` and `navigator.sendBeacon('/api/...` etc
    content = content.replace("'/api/", "`${base}/api/")
    content = content.replace('"/api/', "`${base}/api/")
    # If the file already has `...${...}...` it might be tricky to replace single quotes with template literals if it breaks JS syntax,
    # but since it's just `fetch('/api/box/analysis.json')` -> `fetch(`${base}/api/box/analysis.json`)`
    # Let's use regex for that to ensure it turns into a template literal or string concat.
    
    # Actually, simpler: replace `'/api/` with `base + '/api/`
    content = content.replace("'/api/", "base + '/api/")
    content = content.replace('"/api/', 'base + "/api/')
    
    # For backticks: `/api/` -> `${base}/api/`
    content = content.replace('`/api/', '`${base}/api/')

    with open(fp, 'w', encoding='utf-8') as f:
        f.write(content)
