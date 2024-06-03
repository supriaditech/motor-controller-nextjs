"use client";
import React from "react";
import Master from "../layout/master";
import Image from "next/image";

function Profile() {
  return (
    <Master>
      <div className="flex min-h-screen flex-col items-center gap-4 p-20 bg-blue-50">
        <div className="text-2xl font-bold p-4 text-black">
          Anggota Kelompok
        </div>
        <div className="flex flex-wrap justify-center items-center bg-blue-200 w-full p-8 rounded-md gap-10">
          <div className="flex justify-center items-center bg-white py-4 px-6 rounded-md gap-4 w-1/4">
            <Image
              src={"/image/image1.jpeg"}
              width={60}
              height={60}
              className="rounded-3xl"
              alt="Profile Picture"
            />
            <div className="text-black text-sm">
              <p className="font-bold">Nama</p>
              <p>564655446546</p>
            </div>
          </div>
          <div className="flex justify-center items-center bg-white py-4 px-6 rounded-md gap-4 w-1/4">
            <Image
              src={"/image/image1.jpeg"}
              width={60}
              height={60}
              className="rounded-3xl"
              alt="Profile Picture"
            />
            <div className="text-black text-sm">
              <p className="font-bold">Nama</p>
              <p>564655446546</p>
            </div>
          </div>
          <div className="flex justify-center items-center bg-white py-4 px-6 rounded-md gap-4 w-1/4">
            <Image
              src={"/image/image1.jpeg"}
              width={60}
              height={60}
              className="rounded-3xl"
              alt="Profile Picture"
            />
            <div className="text-black text-sm">
              <p className="font-bold">Nama</p>
              <p>564655446546</p>
            </div>
          </div>
          <div className="flex justify-center items-center bg-white py-4 px-6 rounded-md gap-4 w-1/4">
            <Image
              src={"/image/image1.jpeg"}
              width={60}
              height={60}
              className="rounded-3xl"
              alt="Profile Picture"
            />
            <div className="text-black text-sm">
              <p className="font-bold">Nama</p>
              <p>564655446546</p>
            </div>
          </div>
          <div className="flex justify-center items-center bg-white py-4 px-6 rounded-md gap-4 w-1/4">
            <Image
              src={"/image/image1.jpeg"}
              width={60}
              height={60}
              className="rounded-3xl"
              alt="Profile Picture"
            />
            <div className="text-black text-sm">
              <p className="font-bold">Nama</p>
              <p>564655446546</p>
            </div>
          </div>
          <div className="flex justify-center items-center bg-white py-4 px-6 rounded-md gap-2 w-1/4">
            <Image
              src={"/image/image1.jpeg"}
              width={60}
              height={60}
              className="rounded-3xl"
              alt="Profile Picture"
            />
            <div className="text-black text-sm">
              <p className="font-bold">Nama</p>
              <p>564655446546</p>
            </div>
          </div>
          <div className="flex justify-center items-center bg-white py-4 px-6 rounded-md gap-2 w-1/4">
            <Image
              src={"/image/image1.jpeg"}
              width={60}
              height={60}
              className="rounded-3xl"
              alt="Profile Picture"
            />
            <div className="text-black text-sm">
              <p className="font-bold">Nama</p>
              <p>564655446546</p>
            </div>
          </div>
          <div className="flex justify-center items-center bg-white py-4 px-6 rounded-md gap-2 w-1/4">
            <Image
              src={"/image/image1.jpeg"}
              width={60}
              height={60}
              className="rounded-3xl"
              alt="Profile Picture"
            />
            <div className="text-black text-sm">
              <p className="font-bold">Nama</p>
              <p>564655446546</p>
            </div>
          </div>
        </div>
      </div>
    </Master>
  );
}

export default Profile;
