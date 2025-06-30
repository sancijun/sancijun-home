import { journeyConfig } from "@/config/journey"
import { Post } from "contentlayer/generated"

interface JourneyStatsProps {
  posts: Post[]
}

export default function JourneyStats({ posts }: JourneyStatsProps) {
  const totalPlanned = journeyConfig.plannedRoute2024.length
  const totalVisited = posts.length
  const progressPercentage = totalVisited > 0 ? Math.round((totalVisited / totalPlanned) * 100) : 0

  // 计算覆盖的省份
  const visitedProvinces = new Set(
    posts
      .filter(post => post.location)
      .map(post => {
        // 这里可以根据位置坐标推断省份，暂时用一个简单的映射
        // 实际应用中可能需要更复杂的地理编码
        return "已访问省份" // 占位符
      })
  )

  const plannedProvinces = new Set(
    journeyConfig.plannedRoute2024.map(dest => dest.province)
  )

  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">旅行统计</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{totalVisited}</div>
          <div className="text-sm text-gray-600">已访问</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{totalPlanned}</div>
          <div className="text-sm text-gray-600">计划中</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{plannedProvinces.size}</div>
          <div className="text-sm text-gray-600">涉及省份</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{progressPercentage}%</div>
          <div className="text-sm text-gray-600">完成度</div>
        </div>
      </div>

      {/* 进度条 */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>旅行进度</span>
          <span>{totalVisited} / {totalPlanned}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* 省份分布 */}
      <div className="space-y-2">
        <h4 className="font-medium text-gray-900">计划覆盖省份</h4>
        <div className="flex flex-wrap gap-2">
          {Array.from(plannedProvinces).map(province => (
            <span 
              key={province}
              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
            >
              {province}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
} 