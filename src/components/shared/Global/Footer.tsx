"use client"
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { Github, InstagramIcon, Linkedin } from 'lucide-react'
import { usePathname } from 'next/navigation'
import logo from "../../../../public/assets/logo.webp"
const Footer = () => {
  const pathName = usePathname()
  return pathName.startsWith("/register") || pathName.startsWith("/login") ? "" : (

    <footer className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div
          className="flex flex-col items-center gap-4 rounded-lg bg-indigo-600 p-6 shadow-lg sm:flex-row sm:justify-between"
        >
          <strong className="text-xl text-white sm:text-xl"> Start Exploring Property! </strong>

          <Link
            className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-8 py-3 text-indigo-600 hover:bg-transparent hover:text-white focus:outline-none focus:ring active:bg-white/90"
            href={"/property"}
          >
            <span className="text-sm font-medium"> Let&apos;s Get Started </span>

            <svg
              className="size-5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-gray-900">About Us</p>

            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <a className="text-gray-700 transition hover:text-gray-700/75" href="#">
                  Company History
                </a>
              </li>

              <li>
                <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Meet the Team </a>
              </li>

              <li>
                <a className="text-gray-700 transition hover:text-gray-700/75" href="#">
                  Employee Handbook
                </a>
              </li>

              <li>
                <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Careers </a>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-gray-900">Our Services</p>

            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <a className="text-gray-700 transition hover:text-gray-700/75" href="#">
                  Web Development
                </a>
              </li>

              <li>
                <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Web Design </a>
              </li>

              <li>
                <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Marketing </a>
              </li>

              <li>
                <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Google Ads </a>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-gray-900">Resources</p>

            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Online Guides </a>
              </li>

              <li>
                <a className="text-gray-700 transition hover:text-gray-700/75" href="#">
                  Conference Notes
                </a>
              </li>

              <li>
                <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Forum </a>
              </li>

              <li>
                <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Downloads </a>
              </li>

              <li>
                <a className="text-gray-700 transition hover:text-gray-700/75" href="#">
                  Upcoming Events
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-gray-900">Helpful Links</p>

            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> FAQs </a>
              </li>

              <li>
                <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Support </a>
              </li>


            </ul>
          </div>
        </div>

        <div className="mt-16">
          <ul className="flex justify-center gap-6 sm:justify-end">
            <Link
              href="https://instagram.com/ashwin.203?igshid=YmMyMTA2M2Y="
              aria-label="Insta"
              target="_blank"
              className=' text-gray-500'
            >
              <InstagramIcon size={23} />
            </Link>
            <Link
              href="https://github.com/Ashwin201"
              aria-label="Github"
              target="_blank"
              className=' text-gray-500'
            >
              <Github size={23} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/ashmin-sharma-6a4867257"
              aria-label="Linkedin"
              target="_blank"
              className=' text-gray-500'
            >
              <Linkedin size={23} />
            </Link>
          </ul>

          <div className="mt-16 w-full flex flex-col sm:flex-row sm:items-center  justify-center sm:justify-between">
            <div className=' mx-auto sm:mx-0 mb-4 sm:mb-0'>
              <Image src={logo} alt='Logo' className=' w-28 h-auto' />
            </div>

            <p className="mt-4 text-center text-base text-gray-500 sm:mt-0 sm:text-right">
              Copyright &copy; 2024. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer