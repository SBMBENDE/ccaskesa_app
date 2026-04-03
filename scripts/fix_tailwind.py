import os

files = [
    'app/donations/page.tsx',
    'app/projects/[id]/page.tsx',
    'app/blog/[slug]/page.tsx',
    'app/dashboard/page.tsx',
    'app/dashboard/notifications/page.tsx',
    'app/branches/[branch]/page.tsx',
    'components/donation/DonateClient.tsx',
    'components/home/RecentBlog.tsx',
    'components/home/BranchesPreview.tsx',
    'components/home/FeaturedProjects.tsx',
    'components/layout/Footer.tsx',
    'components/layout/Header.tsx',
    'components/projects/ProjectsClient.tsx',
    'components/blog/BlogClient.tsx',
    'app/globals.css',
    'app/page.tsx',
]

replacements = [
    ('bg-gradient-to-br', 'bg-linear-to-br'),
    ('bg-gradient-to-bl', 'bg-linear-to-bl'),
    ('bg-gradient-to-r', 'bg-linear-to-r'),
    ('bg-gradient-to-b', 'bg-linear-to-b'),
    ('bg-gradient-to-t', 'bg-linear-to-t'),
    ('bg-gradient-to-l', 'bg-linear-to-l'),
    ('flex-shrink-0', 'shrink-0'),
    ('border-black/[.08]', 'border-black/8'),
    ('hover:bg-black/[.04]', 'hover:bg-black/4'),
    ('md:w-[158px]', 'md:w-39.5'),
]

for f in files:
    if not os.path.exists(f):
        continue
    with open(f) as fh:
        content = fh.read()
    orig = content
    for old, new in replacements:
        content = content.replace(old, new)
    if content != orig:
        with open(f, 'w') as fh:
            fh.write(content)
        print(f'Fixed: {f}')

print('Done')
