import os
import re

count = 0
for root, _, files in os.walk('c:/Users/User/Documents/Projects/Laravel/app/resources/js/components'):
    for file in files:
        if file.endswith('.ts') or file.endswith('.tsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            # Next/Image
            new_content = re.sub(r'import\s+Image\s+from\s+[\'"]next/image[\'"];?', '', new_content)
            new_content = re.sub(r'<Image\b', '<img', new_content)
            
            # Next/Link
            new_content = re.sub(r'import\s+Link\s+from\s+[\'"]next/link[\'"];?', "import { Link } from '@inertiajs/react';", new_content)
            new_content = re.sub(r'import\s+\{\s*Link\s*\}\s+from\s+[\'"]@/navigation[\'"];?', "import { Link } from '@inertiajs/react';", new_content)

            # next-intl
            new_content = re.sub(r'import\s+\{\s*useLocale\s*\}\s+from\s+[\'"]next-intl[\'"];?', "import { useLocale } from '@/lib/i18n';", new_content)
            new_content = re.sub(r'import\s+\{\s*useTranslations\s*\}\s+from\s+[\'"]next-intl[\'"];?', "import { useTranslations } from '@/lib/i18n';", new_content)
            new_content = re.sub(r'import\s+\{\s*useLocale\s*,\s*useTranslations\s*\}\s+from\s+[\'"]next-intl[\'"];?', "import { useLocale, useTranslations } from '@/lib/i18n';", new_content)
            new_content = re.sub(r'import\s+\{\s*useTranslations\s*,\s*useLocale\s*\}\s+from\s+[\'"]next-intl[\'"];?', "import { useTranslations, useLocale } from '@/lib/i18n';", new_content)

            if content != new_content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                count += 1
                print(f'Updated {file}')
print(f'Total {count} files fixed.')
