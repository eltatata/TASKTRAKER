"use client"

import { useEffect, useState } from 'react'
import { Task } from '@prisma/client'
import Link from 'next/link';
import {
  ArrowLeft,
  Edit,
  Trash
} from 'lucide-react';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Separator } from '../ui/separator';
import { priorities, statuses } from "./data"
import EditTask from './edit-task';
import DeleteAlert from "./delete-task";

export default function TaskClient({ task }: { task: Task }) {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true)
  }, []);

  if (!isClient) return null

  const details = [
    {
      key: 'Status', content:
        statuses.map((status) => (
          status.value === task.status && (
            <div key={status.value} className="flex items-center">
              {status.icon && (
                <status.icon className={`mr-1 h-4 w-4 ${status.color}`} />
              )}
              <p>{status.label}</p>
            </div>
          )
        ))
    },
    {
      key: 'Priority', content:
        priorities.map((priority) => (
          priority.value === task.priority && (
            <div key={priority.value} className="flex items-center">
              {priority.icon && (
                <priority.icon className={`mr-1 h-4 w-4`} />
              )}
              <p>{priority.label}</p>
            </div>
          )
        ))
    },
    { key: 'Created At', content: <p>{task.createdAt?.toLocaleTimeString()}</p> },
    { key: 'Start Date', content: task.startDate ? <p>{task.startDate?.toLocaleTimeString()}</p> : <p className='text-muted'>not defined</p> },
    { key: 'End Date', content: task.endDate ? <p>{task.endDate?.toLocaleTimeString()}</p> : <p className='text-muted'>not defined</p> },
  ]

  return (
    <>
      <div className='mx-auto lg:w-3/4 space-y-4'>
        <div className='flex justify-between items-center'>
          <Link
            href="/tasks"
            className='inline-flex gap-2 border px-3 py-2 rounded-md font-semibold bg-white text-black'
          >
            <ArrowLeft className="h-6 w-6" />
            Tasks
          </Link>
          <div className='flex gap-4'>
            <span
              className='hover:opacity-50 transition-opacity duration-200 ease-in-out cursor-pointer'
              onClick={() => setOpenEdit(true)}
            >
              <Edit className="h-6 w-6" />
            </span>
            <span
              className='hover:opacity-50 text-red-500 transition-opacity duration-200 ease-in-out cursor-pointer'
              onClick={() => setOpenDelete(true)}
            >
              <Trash className="h-6 w-6" />
            </span>
          </div>
        </div>
        <div className="flex gap-8 rounded-xl p-10 animate-fade-left bg-black bg-opacity-5 backdrop-blur-sm">
          <div className="flex-1 space-y-6">
            <h1 className="text-5xl font-bold">{task.title}</h1>
            <Separator />
            <div className='space-y-4'>
              {details.map((detail) => (
                <div key={detail.key} className="flex items-center gap-2">
                  <p className="font-semibold">{detail.key}:</p>
                  {detail.content}
                </div>
              ))}
            </div>
            <Separator 
              className='border-2 border-gray-500 rounded-full'
            />
            <Markdown
              className="prose max-w-none dark:prose-invert"
              remarkPlugins={[remarkGfm]}
            >
              {task?.description || "Task without description"}
            </Markdown>
          </div>
        </div>
      </div>

      <EditTask
        task={task}
        isOpen={openEdit}
        onClose={() => setOpenEdit(false)}
      />

      <DeleteAlert
        taskId={task.id}
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
      />
    </>
  )
}
