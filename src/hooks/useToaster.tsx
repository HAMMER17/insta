"use client"

import { toaster } from "@/components/ui/toaster"

const Toaster = ({ title, type }: any) => {
  return (
    toaster.create({
      title: title,
      type: type,
    })



  )
}
export default Toaster;
