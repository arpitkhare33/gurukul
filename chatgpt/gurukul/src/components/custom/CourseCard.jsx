import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function CourseCard({ title, image, completionPercentage }) {
  return (
    <Card className="w-full max-w-sm overflow-hidden m-5">
      <div className="relative aspect-video">
        <img
          src={image || "/placeholder.svg?height=200&width=300"}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col items-start gap-2">
        <div className="flex justify-between items-center w-full">
          <Badge variant={completionPercentage === 100 ? "default" : "secondary"}>
            {completionPercentage === 100 ? "Completed" : "In Progress"}
          </Badge>
          <span className="text-sm text-gray-500">{completionPercentage}% Complete</span>
        </div>
        <Progress value={completionPercentage} className="w-full" />
      </CardFooter>
    </Card>
  )
}

