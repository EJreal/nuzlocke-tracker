import os
import re

files_to_patch = [
    'src/routes/+error.svelte',
    'src/routes/(app)/saves/+page.svelte',
    'src/routes/(app)/+page.svelte',
    'src/lib/components/qr/ImportModal.svelte',
    'src/lib/components/navs/GameHeading.svelte',
    'src/lib/components/Guide/Hero.svelte',
    'src/routes/(app)/graveyard/Fog.svelte',
    'src/routes/(app)/graveyard/Grave.svelte',
    'src/routes/(app)/graveyard/+page.svelte'
]

for fp in files_to_patch:
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'from \'$app/paths\'' not in content:
        if '<script>' in content:
            content = content.replace('<script>', '<script>\n  import { base } from \'$app/paths\'\n', 1)
        else:
            content = '<script>\n  import { base } from \'$app/paths\'\n</script>\n\n' + content
    
    content = re.sub(r'href="/([^"]*)"', r'href="{base}/\1"', content)
    content = re.sub(r'src="/([^"]*)"', r'src="{base}/\1"', content)
    content = content.replace("img = '/assets/img/pokemon/base-202.png'", "img = base + '/assets/img/pokemon/base-202.png'")
    
    with open(fp, 'w', encoding='utf-8') as f:
        f.write(content)
