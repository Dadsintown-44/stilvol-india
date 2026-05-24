'use client';

import Link from 'next/link';
import React from 'react';

const companyLinks = [
  { text: 'About', href: '#' },
  { text: 'Features', href: '#' },
  { text: 'Works', href: '#' },
  { text: 'Career', href: '#' },
];

const helpLinks = [
  { text: 'Customer Support', href: '#' },
  { text: 'Delivery Details', href: '#' },
  { text: 'Terms & Conditions', href: 'terms' },
  { text: 'Privacy Policy', href: 'privacy' },
];

const resourceLinks = [
  { text: 'Free eBooks', href: '#' },
  { text: 'Development Tutorial', href: '#' },
  { text: 'How to - Blog', href: '#' },
  { text: 'YouTube Playlist', href: '#' },
];

const extraLinks = [
  { text: 'Customer Support', href: '#' },
  { text: 'Delivery Details', href: '#' },

];

function FooterColumn({ title, links }: { title: string; links: { text: string; href: string }[] }) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-bold text-white text-[16px]">{title}</h3>
      <ul className="flex flex-col gap-5">
        {links.map((link, i) => (
          <li key={i}>
            <Link href={link.href} className="text-white/80 hover:text-white text-[14px] transition-colors">
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#39795F] border-t border-white/10 font-sans">
      <div className="max-w-[1240px] mx-auto px-6 py-16 lg:py-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 lg:mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-start pr-4 md:pr-12">
            <div className="flex items-center gap-3 mb-6 lg:mb-8">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 8C4 5.79086 5.79086 4 8 4H18C19.1046 4 20 4.89543 20 6V16C20 18.2091 18.2091 20 16 20H6C4.89543 20 4 19.1046 4 18V8Z" fill="#FBBF24"/>
                <path d="M8 12C8 9.79086 9.79086 8 12 8H22C23.1046 8 24 8.89543 24 10V20C24 22.2091 22.2091 24 20 24H10C8.89543 24 8 23.1046 8 22V12Z" fill="#2563EB"/>
              </svg>
              <span className="text-[22px] font-bold text-white tracking-tight">Stilvoll India</span>
            </div>
            <p className="text-white/80 text-[15px] leading-[1.8] mb-6 lg:mb-8 max-w-sm">
              Amet minim mollit non deserunt ullamco est sit
              aliqua dolor do amet sint. Velit officia consequat
              duis enim velit mollit.
            </p>
            <button className="bg-white hover:bg-white hover:text-[#39795F] text-[#39795F] px-6 py-3.5 rounded-md flex items-center gap-2.5 font-medium transition-colors text-[15px] shadow-sm hover:shadow-md">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                <path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/>
              </svg>
              Contact Us
            </button>
          </div>

          <div className="lg:col-span-2">
            <FooterColumn title="Company" links={companyLinks} />
          </div>
          <div className="lg:col-span-2">
            <FooterColumn title="Help" links={helpLinks} />
          </div>
          <div className="lg:col-span-2">
            <FooterColumn title="Resources" links={resourceLinks} />
          </div>
          <div className="lg:col-span-2">
            <FooterColumn title="Extra Links" links={extraLinks} />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/80 text-[14px]">
            &copy; Copyright 2021, All Rights Reserved by Stilvoll India
          </p>
          <div className="flex items-center gap-3">
            {[
              {
                name: 'Twitter',
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                )
              },
              {
                 name: 'Facebook',
                 icon: (
                   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                   </svg>
                 )
              },
              {
                name: 'Instagram',
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                )
              },
              {
                name: 'Github',
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                    <path d="M9 18c-4.51 2-5-2-7-2"/>
                  </svg>
                )
              }
            ].map((social, i) => (
              <a
                key={i}
                href="#"
                className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-white bg-white/10 hover:bg-white hover:text-[#39795F] transition-colors shadow-sm"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}