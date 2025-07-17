'use client'

import { subjects } from '@/constants'
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'

const SubjectFilter = () => {
  const router = useRouter()

  const searchParams = useSearchParams()

  const query = searchParams.get('subject') || ''

  const [subject, setSubject] = useState<string>(query)

  useEffect(() => {
    if (query === subject) {
      return
    }

    let newUrl = ''

    if (subject === 'all') {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ['subject']
      })
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'subject',
        value: subject
      })
    }

    router.push(newUrl, {
      scroll: false
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject])

  return (
    <Select
      onValueChange={setSubject}
      value={subject}
      defaultValue={''}
    >
      <SelectTrigger className="input capitalize">
        <SelectValue placeholder="Select the subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          value="all"
          className="capitalize"
        >
          All subjects
        </SelectItem>
        {subjects.map((subject) => (
          <SelectItem
            key={subject}
            value={subject}
            className="capitalize"
          >
            {subject}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SubjectFilter
