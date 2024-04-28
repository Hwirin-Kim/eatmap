import Link from "next/link";
import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="navbar">
        <div className="navbar_logo">
          <Link href="/">MatJip</Link>
        </div>
        <ul className="navbar_list">
          <Link className="navbar_list_item" href="/stores">
            맛집 목록
          </Link>
          <Link className="navbar_list_item" href="/stores/new">
            맛집 등록
          </Link>
          <Link className="navbar_list_item" href="/users/likes">
            찜한 가게
          </Link>
          <Link className="navbar_list_item" href="/users/login">
            로그인
          </Link>
        </ul>
        {/* mobile only */}
        <div
          role="presentation"
          onClick={() => setIsOpen((prev) => !prev)}
          className="navbar_button"
        >
          {isOpen ? <IoMdClose /> : <IoMenu />}
        </div>
      </div>
      {isOpen && (
        <div className="navbar_mobile">
          <ul className="navbar_list_mobile">
            <Link className="navbar_list_item_mobile" href="/stores">
              맛집 목록
            </Link>
            <Link className="navbar_list_item_mobile" href="/stores/new">
              맛집 등록
            </Link>
            <Link className="navbar_list_item_mobile" href="/users/likes">
              찜한 가게
            </Link>
            <Link className="navbar_list_item_mobile" href="/users/login">
              로그인
            </Link>
          </ul>
        </div>
      )}
    </>
  );
}
