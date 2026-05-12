// Icons — lightweight inline SVGs in a consistent stroke style.
// Stroke 1.6, rounded caps. 24x24 viewBox.

const Icon = ({ children, size = 18, className = "", style = {}, strokeWidth = 1.6 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
  >
    {children}
  </svg>
);

const IconHome = (p) => (<Icon {...p}><path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5h4v5"/></Icon>);
const IconClipboard = (p) => (<Icon {...p}><rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4v-.5A1.5 1.5 0 0 1 10.5 2h3A1.5 1.5 0 0 1 15 3.5V4"/><path d="M9 10h6M9 14h6M9 18h4"/></Icon>);
const IconCalendar = (p) => (<Icon {...p}><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M8 3v4M16 3v4M3.5 10h17"/></Icon>);
const IconChart = (p) => (<Icon {...p}><path d="M4 20h16"/><path d="M7 16V10"/><path d="M12 16V6"/><path d="M17 16v-4"/></Icon>);
const IconUser = (p) => (<Icon {...p}><circle cx="12" cy="8" r="3.5"/><path d="M5 20c1-3.5 4-5 7-5s6 1.5 7 5"/></Icon>);
const IconSettings = (p) => (<Icon {...p}><circle cx="12" cy="12" r="2.5"/><path d="M12 3v2M12 19v2M5 12H3M21 12h-2M6.3 6.3 4.9 4.9M19.1 19.1l-1.4-1.4M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/></Icon>);
const IconBell = (p) => (<Icon {...p}><path d="M6 17V11a6 6 0 1 1 12 0v6"/><path d="M4.5 17h15"/><path d="M10 20a2 2 0 0 0 4 0"/></Icon>);
const IconLogout = (p) => (<Icon {...p}><path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/><path d="M10 8l-4 4 4 4"/><path d="M6 12h12"/></Icon>);
const IconChevronRight = (p) => (<Icon {...p}><path d="M9 6l6 6-6 6"/></Icon>);
const IconChevronLeft = (p) => (<Icon {...p}><path d="M15 6l-6 6 6 6"/></Icon>);
const IconChevronDown = (p) => (<Icon {...p}><path d="M6 9l6 6 6-6"/></Icon>);
const IconArrowRight = (p) => (<Icon {...p}><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></Icon>);
const IconSearch = (p) => (<Icon {...p}><circle cx="11" cy="11" r="6"/><path d="M20 20l-4.3-4.3"/></Icon>);
const IconPlus = (p) => (<Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>);
const IconCheck = (p) => (<Icon {...p}><path d="M5 12.5 10 17l9-10"/></Icon>);
const IconClose = (p) => (<Icon {...p}><path d="M6 6l12 12M18 6 6 18"/></Icon>);
const IconClock = (p) => (<Icon {...p}><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></Icon>);
const IconAlert = (p) => (<Icon {...p}><path d="M12 4 2.5 20h19L12 4z"/><path d="M12 10v5"/><circle cx="12" cy="17.5" r=".5"/></Icon>);
const IconMoon = (p) => (<Icon {...p}><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/></Icon>);
const IconCollapse = (p) => (<Icon {...p}><rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M9 4.5v15"/><path d="M14 9l-2 3 2 3"/></Icon>);
const IconHeart = (p) => (<Icon {...p}><path d="M12 20.5s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10.5c0 5.6-7 10-7 10z"/></Icon>);
const IconBookmark = (p) => (<Icon {...p}><path d="M7 4h10v17l-5-3.5L7 21V4z"/></Icon>);
const IconVideo = (p) => (<Icon {...p}><rect x="3" y="6.5" width="13" height="11" rx="2"/><path d="m16 11 5-3v8l-5-3"/></Icon>);
const IconLocation = (p) => (<Icon {...p}><path d="M12 21s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="9.5" r="2.5"/></Icon>);
const IconExternal = (p) => (<Icon {...p}><path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M10 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-4"/></Icon>);
const IconDownload = (p) => (<Icon {...p}><path d="M12 4v12"/><path d="m7 11 5 5 5-5"/><path d="M5 20h14"/></Icon>);
const IconLifebuoy = (p) => (<Icon {...p}><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.5"/><path d="m6 6 3.5 3.5M14.5 14.5 18 18M14.5 9.5 18 6M6 18l3.5-3.5"/></Icon>);
const IconShield = (p) => (<Icon {...p}><path d="M12 3 5 6v6c0 4 3 7.5 7 9 4-1.5 7-5 7-9V6l-7-3z"/></Icon>);
const IconSun = (p) => (<Icon {...p}><circle cx="12" cy="12" r="3.5"/><path d="M12 3v2M12 19v2M5 12H3M21 12h-2M6.3 6.3 4.9 4.9M19.1 19.1l-1.4-1.4M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/></Icon>);
const IconMessage = (p) => (<Icon {...p}><path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4 4v-4H6a2 2 0 0 1-2-2V6z"/></Icon>);
const IconSparkle = (p) => (<Icon {...p}><path d="M12 4v4M12 16v4M4 12h4M16 12h4M6.5 6.5l2.8 2.8M14.7 14.7l2.8 2.8M6.5 17.5l2.8-2.8M14.7 9.3l2.8-2.8"/></Icon>);

Object.assign(window, {
  IconHome, IconClipboard, IconCalendar, IconChart, IconUser, IconSettings,
  IconBell, IconLogout, IconChevronRight, IconChevronLeft, IconChevronDown,
  IconArrowRight, IconSearch, IconPlus, IconCheck, IconClose, IconClock,
  IconAlert, IconMoon, IconCollapse, IconHeart, IconBookmark, IconVideo,
  IconLocation, IconExternal, IconDownload, IconLifebuoy, IconShield, IconSun,
  IconMessage, IconSparkle, Icon,
});
