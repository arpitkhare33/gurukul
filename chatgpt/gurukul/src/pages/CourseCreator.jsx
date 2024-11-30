'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, Plus, Video, FileText } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { useForm } from 'react-hook-form'

export function CourseCreator() {
  const [sections, setSections] = useState([
    {
      id: 1,
      title: "Week 1",
      items: [
        { id: 1, title: "Welcome to the World of Python", type: "video" },
        { id: 2, title: "Data Types in Python", type: "video" },
        { id: 3, title: "Playing with Strings", type: "video" },
      ]
    },
    {
      id: 2,
      title: "Week 2",
      items: [
        { id: 4, title: "Operators", type: "video" },
        { id: 5, title: "Playing with Lists", type: "video" },
      ]
    }
  ])

  const form = useForm({
    defaultValues: {
      assignmentCount: "2",
      videoTitle: "",
      youtubeId: "",
      accessOn: "0"
    }
  })

  const addSection = () => {
    setSections([
      ...sections,
      {
        id: sections.length + 1,
        title: `Week ${sections.length + 1}`,
        items: []
      }
    ])
  }

  const addItem = (sectionId) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          items: [
            ...section.items,
            {
              id: Math.random(),
              title: "New Item",
              type: "video"
            }
          ]
        }
      }
      return section
    }))
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <div className="w-80 border-r p-4 bg-gray-50">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Python Cohort</h2>
          <p className="text-sm text-gray-500">17 Videos (0 Assignments)</p>
        </div>
        
        {sections.map((section) => (
          <Collapsible key={section.id} className="mb-2">
            <CollapsibleTrigger className="flex items-center w-full hover:bg-gray-100 p-2 rounded">
              <ChevronRight className="h-4 w-4 mr-2" />
              <span>{section.title}</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-6 space-y-2">
              {section.items.map((item) => (
                <div key={item.id} className="flex items-center p-2 hover:bg-gray-100 rounded">
                  {item.type === 'video' ? (
                    <Video className="h-4 w-4 mr-2" />
                  ) : (
                    <FileText className="h-4 w-4 mr-2" />
                  )}
                  <span className="text-sm">{item.title}</span>
                </div>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => addItem(section.id)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add chapter items
              </Button>
            </CollapsibleContent>
          </Collapsible>
        ))}
        
        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={addSection}
        >
          Add new Section
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Add Course Content</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-6">
                <FormField
                  control={form.control}
                  name="assignmentCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assignment / Recordings</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="videoTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assignment / Video Title</FormLabel>
                      <FormControl>
                        <div className="border rounded-md">
                          <div className="flex items-center border-b p-2 gap-2">
                            <Button variant="ghost" size="sm">Normal</Button>
                            <Button variant="ghost" size="sm">B</Button>
                            <Button variant="ghost" size="sm">I</Button>
                            <Button variant="ghost" size="sm">U</Button>
                            <Button variant="ghost" size="sm">Link</Button>
                          </div>
                          <Input
                            {...field}
                            className="border-0"
                            placeholder="Writing your first Python Program"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="youtubeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Youtube Video Id</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accessOn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Access On</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="bg-blue-500 hover:bg-purple-700 text-white">
                  Save Course
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

