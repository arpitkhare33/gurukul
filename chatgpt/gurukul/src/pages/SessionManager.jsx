'use client'

import { Monitor } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function SessionManager() {
  const sessions = [
    {
      id: 1,
      device: "Macintosh",
      status: "Active",
      browser: "Chrome",
      lastActive: "5 seconds ago",
      ipAddress: "152.59.182.16"
    },
    {
      id: 2,
      device: "Macintosh",
      browser: "Chrome",
      lastActive: "4 months ago",
      ipAddress: "49.43.118.207"
    },
    {
      id: 3,
      device: "Macintosh",
      browser: "Chrome",
      lastActive: "7 months ago",
      ipAddress: "49.43.112.185"
    },
    {
      id: 4,
      device: "Macintosh",
      browser: "Chrome",
      lastActive: "7 months ago",
      ipAddress: "49.43.112.185"
    }
  ]

  const handleEndSession = (sessionId) => {
    console.log(`Ending session ${sessionId}`)
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Manage your logged in sessions</CardTitle>
          <CardDescription className="text-lg">
            Manage and logout your active sessions on other browsers and devices.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <Monitor className="h-6 w-6 text-gray-500" />
                <div>
                  <div className="flex items-center">
                    <p className="font-medium">
                      {session.device}
                      {session.status && (
                        <span className="ml-2 text-sm text-gray-500">
                          ({session.status})
                        </span>
                      )}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {session.browser} - {session.lastActive}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">{session.ipAddress}</span>
                <Button
                  variant="ghost"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => handleEndSession(session.id)}
                >
                  End Session
                </Button>
              </div>
            </div>
          ))}

          <Alert variant="destructive" className="mt-6 bg-red-50 text-red-500 border-red-200">
            <AlertDescription>
              Account will be automatically blocked if logged in from multiple devices or
              locations simultaneously. It's an irreversible action for security.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}

