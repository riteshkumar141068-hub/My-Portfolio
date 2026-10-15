import { FaReact, FaNodeJs, FaGitAlt, FaFigma, FaPython, FaJava } from 'react-icons/fa';
import {
    SiNextdotjs, SiTypescript, SiJavascript, SiPostgresql,
    SiTailwindcss, SiStyledcomponents, SiPytorch,
    SiPandas, SiNumpy, SiLinux, SiPostman, SiCplusplus
} from 'react-icons/si';

export const skillCategories = [
    {
        title: 'Software & Backend',
        description: 'Scalable backend architectures and algorithmic logic',
        icon: '⚙️',
        skills: [
            { name: 'Python', icon: FaPython, level: 90, color: '#3776AB' },
            { name: 'Java', icon: FaJava, level: 85, color: '#ED8B00' },
            { name: 'C++', icon: SiCplusplus, level: 80, color: '#00599C' },
            { name: 'PostgreSQL / SQL', icon: SiPostgresql, level: 82, color: '#4169E1' },
            { name: 'Node.js', icon: FaNodeJs, level: 80, color: '#339933' },
            { name: 'Postman & REST APIs', icon: SiPostman, level: 86, color: '#FF6C37' },
        ],
    },
    {
        title: 'AI, ML & Data Analysis',
        description: 'Intelligent automation, NLP chatbots, and analytics',
        icon: '🧠',
        skills: [
            { name: 'AI & Machine Learning', icon: SiPytorch, level: 84, color: '#EE4C2C' },
            { name: 'Pandas & NumPy', icon: SiPandas, level: 88, color: '#150458' },
            { name: 'Data Visualization', icon: SiNumpy, level: 85, color: '#013243' },
            { name: 'NLP & Chatbots', icon: FaPython, level: 82, color: '#38BDF8' },
            { name: 'Cybersecurity Basics', icon: SiLinux, level: 78, color: '#10B981' },
            { name: 'Linux / Terminal', icon: SiLinux, level: 80, color: '#FCC624' },
        ],
    },
    {
        title: 'Frontend & Modern Web',
        description: 'High-performance interactive digital experiences',
        icon: '🎨',
        skills: [
            { name: 'React.js', icon: FaReact, level: 92, color: '#61DAFB' },
            { name: 'Next.js', icon: SiNextdotjs, level: 88, color: '#FFFFFF' },
            { name: 'JavaScript', icon: SiJavascript, level: 90, color: '#F7DF1E' },
            { name: 'TypeScript', icon: SiTypescript, level: 82, color: '#3178C6' },
            { name: 'Tailwind CSS', icon: SiTailwindcss, level: 92, color: '#06B6D4' },
            { name: 'Git & GitHub', icon: FaGitAlt, level: 90, color: '#F05032' },
        ],
    },
];
