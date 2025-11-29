import { Code, Layers, Zap, Server, Cloud, Database, Box, PenTool } from 'lucide-react';

export const skillsOld: {
    name: string;
    image?: string;
    short: string;
    color: string;
    Icon: React.ComponentType<any>;
}[] = [
        { name: 'Figma', image: 'https://res.cloudinary.com/dmdzyoslx/image/upload/v1762841924/avatars/7f140305-1b4a-4696-9af9-2322072d6d3f.svg', short: 'R', color: 'from-[#61DAFB] to-[#0ea5a4]', Icon: Code },
        { name: 'React', image: 'https://res.cloudinary.com/dmdzyoslx/image/upload/v1762841998/avatars/a062c0db-877f-4c33-9032-04f24f02432e.svg', short: 'N', color: 'from-[#111827] to-[#374151]', Icon: Layers },
        { name: 'C', image: 'https://res.cloudinary.com/dmdzyoslx/image/upload/v1762842023/avatars/130474e0-47ce-42c5-95f6-1b0342de86ba.svg', short: 'TS', color: 'from-[#0ea5ff] to-[#4f46e5]', Icon: Zap },
        { name: 'Node.js', image: 'https://res.cloudinary.com/dmdzyoslx/image/upload/v1762842052/avatars/eabfbdb8-b9f7-495f-8272-4a21a1962dcd.svg', short: 'Nd', color: 'from-[#68a063] to-[#166534]', Icon: Server },
        { name: 'Tailwind', image: 'https://res.cloudinary.com/dmdzyoslx/image/upload/v1762842081/avatars/a27b7555-b9dc-412d-9bb3-3647603db1c2.svg', short: 'TW', color: 'from-[#06b6d4] to-[#0891b2]', Icon: Cloud },
        { name: 'Postgres', image: 'https://res.cloudinary.com/dmdzyoslx/image/upload/v1762842106/avatars/d0609dc1-3810-43fe-b936-4b2df39d7499.svg', short: 'PG', color: 'from-[#2563eb] to-[#4f46e5]', Icon: Database },
        { name: 'Docker', image: 'https://res.cloudinary.com/dmdzyoslx/image/upload/v1762842128/avatars/819d96a8-6a91-4839-9212-dba8edcd294e.svg', short: 'D', color: 'from-[#2496ED] to-[#0f172a]', Icon: Box },
        { name: 'UI/UX', image: 'https://res.cloudinary.com/dmdzyoslx/image/upload/v1762842151/avatars/46aba61a-74fc-44d0-b9c0-d7e28b7d9852.svg', short: 'UX', color: 'from-[#fb7185] to-[#8b5cf6]', Icon: PenTool },
        { name: 'UI/UX', image: 'https://res.cloudinary.com/dmdzyoslx/image/upload/v1762842181/avatars/53e9b393-916c-484a-9200-20ecb731288d.svg', short: 'UX', color: 'from-[#fb7185] to-[#8b5cf6]', Icon: PenTool },
        { name: 'UI/UX', image: 'https://res.cloudinary.com/dmdzyoslx/image/upload/v1762842210/avatars/ee07db45-c363-4b6a-88d2-eb47dc5346d5.svg', short: 'UX', color: 'from-[#fb7185] to-[#8b5cf6]', Icon: PenTool },
        { name: 'UI/UX', image: 'https://res.cloudinary.com/dmdzyoslx/image/upload/v1762842231/avatars/40e526e5-770b-4cd0-8224-30582ca669e8.svg', short: 'UX', color: 'from-[#fb7185] to-[#8b5cf6]', Icon: PenTool },
        { name: 'UI/UX', image: 'https://res.cloudinary.com/dmdzyoslx/image/upload/v1762842256/avatars/4c192169-2dac-441a-8372-819729ba081d.svg', short: 'UX', color: 'from-[#fb7185] to-[#8b5cf6]', Icon: PenTool },
        { name: 'UI/UX', image: 'https://res.cloudinary.com/dmdzyoslx/image/upload/v1762842277/avatars/c3418849-eadf-42cd-a807-31b47b2567b2.svg', short: 'UX', color: 'from-[#fb7185] to-[#8b5cf6]', Icon: PenTool },
    ];

export const skills = [
    {
        name: 'React',
        color: 'from-[#61DAFB] to-[#0ea5a4]',
        Icon: Code,
        image: 'https://res.cloudinary.com/dmdzyoslx/image/upload/v1762841924/avatars/7f140305-1b4a-4696-9af9-2322072d6d3f.svg',
    },
    {
        name: 'Next.js',
        color: 'from-[#111827] to-[#374151]',
        Icon: Layers,
        image: 'https://res.cloudinary.com/dmdzyoslx/image/upload/v1762841998/avatars/a062c0db-877f-4c33-9032-04f24f02432e.svg',
    },
    {
        name: 'TypeScript',
        color: 'from-[#0ea5ff] to-[#4f46e5]',
        Icon: Zap,
        image: 'https://res.cloudinary.com/dmdzyoslx/image/upload/v1762842023/avatars/130474e0-47ce-42c5-95f6-1b0342de86ba.svg',
    },
    {
        name: 'Node.js',
        color: 'from-[#68a063] to-[#166534]',
        Icon: Server,
        image: 'https://res.cloudinary.com/dmdzyoslx/image/upload/v1762842052/avatars/eabfbdb8-b9f7-495f-8272-4a21a1962dcd.svg',
    },
    {
        name: 'Tailwind',
        color: 'from-[#06b6d4] to-[#0891b2]',
        Icon: Cloud,
            image: 'https://res.cloudinary.com/dmdzyoslx/image/upload/v1762842151/avatars/46aba61a-74fc-44d0-b9c0-d7e28b7d9852.svg',
        },
    {
        name: 'Postgres',
        color: 'from-[#2563eb] to-[#4f46e5]',
        Icon: Database,
        image: 'https://res.cloudinary.com/dmdzyoslx/image/upload/v1762842210/avatars/ee07db45-c363-4b6a-88d2-eb47dc5346d5.svg',
    },
    {
        name: 'Docker',
        color: 'from-[#2496ED] to-[#0f172a]',
        Icon: Box,
        image: 'https://res.cloudinary.com/dmdzyoslx/image/upload/v1762842235/avatars/3f4e8b6a-8f3e-4d3a-9f3e-1a2b3c4d5e6f.svg',
    },
    {
        name: 'UI/UX',
        color: 'from-[#fb7185] to-[#8b5cf6]',
        Icon: PenTool,
        image: 'https://res.cloudinary.com/dmdzyoslx/image/upload/v1762842256/avatars/4c192169-2dac-441a-8372-819729ba081d.svg',
    },
];