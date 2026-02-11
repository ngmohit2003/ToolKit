// export const featuresData = [
//   {
//     title: "Password Generator",
//     desc: "Create strong, random passwords instantly to protect accounts.",
//     color: "from-blue-500 to-indigo-500",
//   },
//   {
//     title: "Hash Generator",
//     desc: "Convert passwords into secure hashes and analyze their strength.",
//     color: "from-cyan-500 to-teal-500",
//   },
//   {
//     title: "Crack Page",
//     desc: "Simulate password cracking techniques to understand weaknesses.",
//     color: "from-purple-500 to-pink-500",
//   },
//   {
//     title: "Password Manager",
//     desc: "Securely store and manage multiple passwords in one place.",
//     color: "from-orange-400 to-amber-500",
//   },
//   {
//     title: "Packet Analyzer (T-Sharp)",
//     desc: "Analyze network packets to monitor traffic and detect suspicious activity.",
//     color: "from-emerald-500 to-green-500",
//   },
//   {
//     title: "URL Vulnerability Scanner (Nmap)",
//     desc: "Scan URLs and servers to identify open ports and security vulnerabilities.",
//     color: "from-rose-500 to-red-500",
//   },
// ];

import { HiKey, HiLockClosed, HiGlobeAlt } from "react-icons/hi2";
import { TbBinaryTree } from "react-icons/tb";
import { GiBreakingChain } from "react-icons/gi";
import { MdNetworkCheck } from "react-icons/md";

export const featuresData = [
  {
    title: "Password Generator",
    desc: "Generate highly secure, random passwords using customizable rules such as length, symbols, numbers, and uppercase characters to protect user accounts from brute-force and dictionary attacks.",
    color: "from-blue-500 to-indigo-500",
    icon: HiKey,
  },
  {
    title: "Hash Generator",
    desc: "Convert plain text passwords into cryptographic hashes using industry-standard algorithms, helping users understand how passwords are stored securely and how hash strength impacts security.",
    color: "from-cyan-500 to-teal-500",
    icon: TbBinaryTree,
  },
  {
    title: "Crack Page",
    desc: "Simulate password cracking techniques in a controlled environment to demonstrate how weak passwords can be compromised, improving awareness of common security vulnerabilities.",
    color: "from-purple-500 to-pink-500",
    icon: GiBreakingChain,
  },
  {
    title: "Password Manager",
    desc: "Securely store, organize, and manage multiple credentials in one place, reducing password reuse and helping users maintain strong, unique passwords for every service.",
    color: "from-orange-400 to-amber-500",
    icon: HiLockClosed,
  },
  {
    title: "Packet Analyzer (T-Sharp)",
    desc: "Inspect and analyze network packets to understand data flow, detect suspicious traffic patterns, and study how network-level attacks and vulnerabilities occur in real-world systems.",
    color: "from-emerald-500 to-green-500",
    icon: MdNetworkCheck,
  },
  {
    title: "URL Vulnerability Scanner (Nmap)",
    desc: "Scan URLs and servers to identify open ports, running services, and potential security misconfigurations using Nmap-based techniques commonly used in penetration testing.",
    color: "from-rose-500 to-red-500",
    icon: HiGlobeAlt,
  },
];
