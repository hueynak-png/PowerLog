import type { ProgramSeed } from './types';

export const bradExcelProgram: ProgramSeed = {
  "id": "seed-program-brad-full-cycle",
  "name": "Brad Excel 大周期",
  "type": "powerbuilding",
  "goal": "导入 Brad 风格的力量举/增肌周期，包含竞赛动作、变式、辅助训练、RPE 递增及减载。",
  "source": "imported_excel",
  "durationWeeks": 33,
  "includesDeload": true,
  "description": "从 Brad Program.xlsx 中 33 个非 PR 训练周表确定性导入。PR Tracker 已被有意忽略。",
  "createdAt": "2026-05-26T00:00:00.000Z",
  "templateKey": "brad_33_week_full_cycle",
  "instantiationStrategy": "preserve_structure_recalculate_loads",
  "requiresInstantiation": true,
  "weeks": [
    {
      "weekNumber": 1,
      "phase": "accumulation",
      "focus": "Block A Week 1/5",
      "notes": "Imported from Brad workbook sheet A 15 (A 1/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 105.0,
              "targetPercent": 61.8,
              "targetRpe": 5.5,
              "notes": "Top Set -film: 1x3 @ 105kg RPE 5.5; Set 1 - film: 1x5 @ 95kg RPE 4.5; Set 2: 1x5 @ 95kg RPE 4.5; Set 3: 1x5 @ 95kg RPE 4.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetLoad": 105,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 95,
                            "targetRpe": 4.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 95,
                            "targetRpe": 4.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 95,
                            "targetRpe": 4.5
                  }
        ]
      
            },
            {
              "exerciseName": "Bench Press",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 4,
              "targetLoad": 95.0,
              "targetPercent": 73.1,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x4 @ 95kg RPE 6; Set 2: 1x4 @ 95kg RPE 6; Set 3: 1x4 @ 95kg RPE 6; Set 4: 1x4 @ 92.5kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 95,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 95,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 95,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetLoad": 92.5,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Leg Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 122.4,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 70.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Arm Tricep Ext",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 12.5,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Deadlift",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 4,
              "targetLoad": 160.0,
              "targetPercent": 68.1,
              "targetRpe": 5.5,
              "notes": "Set 1 - film: 1x4 @ 160kg RPE 5.5; Set 2: 1x4 @ 150kg RPE 5.5; Set 3: 1x4 @ 150kg RPE 5.5; Set 4: 1x4 @ 150kg RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 160,
                            "targetRpe": 5.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 150,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 150,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetLoad": 150,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip Bench",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 82.5,
              "targetPercent": 63.5,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x8 @ 82.5kg RPE 6; Set 2: 1x8 @ 82.5kg RPE 6; Set 3: 1x8 @ 82.5kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 8,
                            "targetLoad": 82.5,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetLoad": 82.5,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 8,
                            "targetLoad": 82.5,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "45 Degree Back Ext",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 47.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Lat Pull Down",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 92.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Chest Supported Row",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 81.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Bicep Curl",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 15.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Squat",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 4,
              "targetLoad": 100.0,
              "targetPercent": 58.8,
              "targetRpe": 5.5,
              "notes": "Set 1 - film: 1x4 @ 100kg RPE 5.5; Set 2: 1x4 @ 100kg RPE 5.5; Set 3: 1x4 @ 95kg RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 100,
                            "targetRpe": 5.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 100,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 95,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 92.5,
              "targetPercent": 71.2,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x3 @ 92.5kg RPE 5.5; Set 1  - film: 1x5 @ 85kg RPE 4.5; Set 2: 1x5 @ 85kg RPE 4.5; Set 3: 1x5 @ 85kg RPE 4.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetLoad": 92.5,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 85,
                            "targetRpe": 4.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 85,
                            "targetRpe": 4.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 85,
                            "targetRpe": 4.5
                  }
        ]
      
            },
            {
              "exerciseName": "Bulgarian Split Squat",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 22.5,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Pec Fly",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 80.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Tricep Ext",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 60.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 165.0,
              "targetPercent": 70.2,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x3 @ 165kg RPE 5.5; Set 2 - film: 1x5 @ 150kg RPE 4; Set 3: 1x5 @ 150kg RPE 4; Set 3: 1x5 @ 150kg RPE 4",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetLoad": 165,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 150,
                            "targetRpe": 4,
                            "notes": "Set 2 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 150,
                            "targetRpe": 4
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 150,
                            "targetRpe": 4
                  }
        ]
      
            },
            {
              "exerciseName": "3:2:0 tempo Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 85.0,
              "targetPercent": 65.4,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x3 @ 85kg RPE 5; Set 2: 1x3 @ 85kg RPE 5; Set 3: 1x3 @ 85kg RPE 5; Set 4: 1x3 @ 85kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 85,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 85,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 85,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 85,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Seated Dumbbell Overhead Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 25.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Chest Supported Row",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 81.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "DB Hammer Curl",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 17.5,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 2,
      "phase": "accumulation",
      "focus": "Block A Week 2/5",
      "notes": "Imported from Brad workbook sheet A 25 (A 2/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 112.5,
              "targetPercent": 66.2,
              "targetRpe": 6.5,
              "notes": "Top Set -film: 1x3 @ 112.5kg RPE 6.5 (6.5 (110-112.5)); Set 1 - film: 1x5 @ 102.5kg RPE 6; Set 2: 1x5 @ 102.5kg RPE 6; Set 3: 1x5 @ 102.5kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetLoad": 112.5,
                            "targetRpe": 6.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 102.5,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 102.5,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 102.5,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Bench Press",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 4,
              "targetLoad": 97.5,
              "targetPercent": 75.0,
              "targetRpe": 6.5,
              "notes": "Set 1 - film: 1x4 @ 97.5kg RPE 6.5 (6.5 (97.5)); Set 2: 1x4 @ 97.5kg RPE 6.5 (6.5 (97.5)); Set 3: 1x4 @ 97.5kg RPE 6.5 (6.5 (97.5)); Set 4: 1x4 @ 97.5kg RPE 6.5 (6.5 (97.5))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 97.5,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 97.5,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 97.5,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetLoad": 97.5,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Leg Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 150.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 75.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Arm Tricep Ext",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 20.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Deadlift",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 4,
              "targetLoad": 155.0,
              "targetPercent": 66.0,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x4 @ 155kg RPE 6 (6 (155-157.5)); Set 2: 1x4 @ 155kg RPE 6 (6 (155-157.5)); Set 3: 1x4 @ 155kg RPE 6 (6 (155-157.5)); Set 4: 1x4 @ 155kg RPE 6 (6 (155-157.5))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 155,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 155,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 155,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetLoad": 155,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip Bench",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 87.5,
              "targetPercent": 67.3,
              "targetRpe": 6.5,
              "notes": "Set 1 - film: 1x8 @ 87.5kg RPE 6.5 (6.5 (85-87.5)); Set 2: 1x8 @ 87.5kg RPE 6.5 (6.5 (85-87.5)); Set 3: 1x8 @ 87.5kg RPE 6.5 (6.5 (85-87.5))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 8,
                            "targetLoad": 87.5,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetLoad": 87.5,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 8,
                            "targetLoad": 87.5,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "45 Degree Back Ext",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 51.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Lat Pull Down",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 92.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Chest Supported Row",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 81.6,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Bicep Curl",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 15.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Squat",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 4,
              "targetLoad": 107.5,
              "targetPercent": 63.2,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x4 @ 107.5kg RPE 6 (6 (105-107.5)); Set 2: 1x4 @ 107.5kg RPE 6 (6 (105-107.5)); Set 3: 1x4 @ 107.5kg RPE 6 (6 (105-107.5))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 107.5,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 107.5,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 107.5,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 100.0,
              "targetPercent": 76.9,
              "targetRpe": 6.5,
              "notes": "Top Set  - film: 1x3 @ 100kg RPE 6.5 (6.5 (100)); Set 1  - film: 1x5 @ 92.5kg RPE 5; Set 2: 1x5 @ 92.5kg RPE 5; Set 3: 1x5 @ 92.5kg RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetLoad": 100,
                            "targetRpe": 6.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 92.5,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 92.5,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 92.5,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Bulgarian Split Squat",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 25.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Pec Fly",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 80.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Tricep Ext",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 65.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 172.5,
              "targetPercent": 73.4,
              "targetRpe": 6.5,
              "notes": "Top Set  - film: 1x3 @ 172.5kg RPE 6.5 (6.5 (172.5)); Set 2 - film: 1x5 @ 157.5kg RPE 5.5; Set 3: 1x5 @ 157.5kg; Set 3: 1x5 @ 157.5kg",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetLoad": 172.5,
                            "targetRpe": 6.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 157.5,
                            "targetRpe": 5.5,
                            "notes": "Set 2 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 157.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 157.5
                  }
        ]
      
            },
            {
              "exerciseName": "3:2:0 tempo Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 87.5,
              "targetPercent": 67.3,
              "targetRpe": 5.5,
              "notes": "Set 1 - film: 1x3 @ 87.5kg RPE 5.5; Set 2: 1x3 @ 87.5kg RPE 5.5; Set 3: 1x3 @ 87.5kg RPE 5.5; Set 4: 1x3 @ 87.5kg RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 87.5,
                            "targetRpe": 5.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 87.5,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 87.5,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 87.5,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Seated Dumbbell Overhead Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 27.5,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Chest Supported Row",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 86.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "DB Hammer Curl",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 17.5,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 3,
      "phase": "accumulation",
      "focus": "Block A Week 3/5",
      "notes": "Imported from Brad workbook sheet A 35 (A 3/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 120.0,
              "targetPercent": 70.6,
              "targetRpe": 7.5,
              "notes": "Top Set -film: 1x3 @ 120kg RPE 7.5 (7.5 (115-120)); Set 1 - film: 1x5 @ 107.5kg RPE 7; Set 2: 1x5 @ 107.5kg RPE 7; Set 3: 1x5 @ 107.5kg RPE 7",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetLoad": 120,
                            "targetRpe": 7.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 107.5,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 107.5,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 107.5,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Bench Press",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 4,
              "targetLoad": 102.5,
              "targetPercent": 78.8,
              "targetRpe": 7.0,
              "notes": "Set 1 - film: 1x4 @ 102.5kg RPE 7 (7 (100-102.5)); Set 2: 1x4 @ 102.5kg RPE 7 (7 (100-102.5)); Set 3: 1x4 @ 102.5kg RPE 7 (7 (100-102.5)); Set 4: 1x4 @ 102.5kg RPE 7 (7 (100-102.5))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 102.5,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 102.5,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 102.5,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetLoad": 102.5,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Leg Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 155.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 86.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Arm Tricep Ext",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 22.5,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Deadlift",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 4,
              "targetLoad": 160.0,
              "targetPercent": 68.1,
              "targetRpe": 6.5,
              "notes": "Set 1 - film: 1x4 @ 160kg RPE 6.5 (6.5 (160-165)); Set 2: 1x4 @ 160kg RPE 6.5 (6.5 (160-165)); Set 3: 1x4 @ 160kg RPE 6.5 (6.5 (160-165)); Set 4: 1x4 @ 160kg RPE 6.5 (6.5 (160-165))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 160,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 160,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 160,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetLoad": 160,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip Bench",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 92.5,
              "targetPercent": 71.2,
              "targetRpe": 7.0,
              "notes": "Set 1 - film: 1x8 @ 92.5kg RPE 7 (7 (90-92.5)); Set 2: 1x8 @ 92.5kg RPE 7 (7 (90-92.5)); Set 3: 1x8 @ 92.5kg RPE 7 (7 (90-92.5))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 8,
                            "targetLoad": 92.5,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetLoad": 92.5,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 8,
                            "targetLoad": 92.5,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "45 Degree Back Ext",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 56.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Lat Pull Down",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 92.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Chest Supported Row",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 86.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Bicep Curl",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 15.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Squat",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 4,
              "targetLoad": 112.5,
              "targetPercent": 66.2,
              "targetRpe": 6.5,
              "notes": "Set 1 - film: 1x4 @ 112.5kg RPE 6.5 (6.5 (110-112.5)); Set 2: 1x4 @ 112.5kg RPE 6.5 (6.5 (110-112.5)); Set 3: 1x4 @ 112.5kg RPE 6.5 (6.5 (110-112.5))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 112.5,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 112.5,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 112.5,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 105.0,
              "targetPercent": 80.8,
              "targetRpe": 7.5,
              "notes": "Top Set  - film: 1x3 @ 105kg RPE 7.5 (7.5 (105)); Set 1  - film: 1x5 @ 97.5kg RPE 8; Set 2: 1x5 @ 97.5kg RPE 8.5; Set 3: 1x5 @ 97.5kg RPE 9",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetLoad": 105,
                            "targetRpe": 7.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 97.5,
                            "targetRpe": 8,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 97.5,
                            "targetRpe": 8.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 97.5,
                            "targetRpe": 9
                  }
        ]
      
            },
            {
              "exerciseName": "Bulgarian Split Squat",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 30.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Pec Fly",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 85.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Tricep Ext",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 65.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 180.0,
              "targetPercent": 76.6,
              "targetRpe": 7.5,
              "notes": "Top Set  - film: 1x3 @ 180kg RPE 7.5 (7.5 (177.5-180)); Set 2 - film: 1x5 @ 162.5kg RPE 6; Set 3: 1x5 @ 162.5kg RPE 6; Set 3: 1x5 @ 162.5kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetLoad": 180,
                            "targetRpe": 7.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 162.5,
                            "targetRpe": 6,
                            "notes": "Set 2 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 162.5,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 162.5,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "3:2:0 tempo Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 90.0,
              "targetPercent": 69.2,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x3 @ 90kg RPE 6; Set 2: 1x3 @ 90kg RPE 6; Set 3: 1x3 @ 90kg RPE 6; Set 4: 1x3 @ 90kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 90,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 90,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 90,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 90,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Seated Dumbbell Overhead Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 30.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Chest Supported Row",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 90.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "DB Hammer Curl",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 17.5,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 4,
      "phase": "accumulation",
      "focus": "Block A Week 4/5",
      "notes": "Imported from Brad workbook sheet A 45 (A 4/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 122.5,
              "targetPercent": 72.1,
              "targetRpe": 8.5,
              "notes": "Top Set -film: 1x3 @ 122.5kg RPE 8.5 (8.5 (122.5-125)); Set 1 - film: 1x4 @ 110kg RPE 7.5; Set 2: 1x4 @ 110kg RPE 7; Set 3: 1x4 @ 110kg RPE 7",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetLoad": 122.5,
                            "targetRpe": 8.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 110,
                            "targetRpe": 7.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 110,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 110,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Bench Press",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 4,
              "targetLoad": 105.0,
              "targetPercent": 80.8,
              "targetRpe": 7.5,
              "notes": "Set 1 - film: 1x4 @ 105kg RPE 7.5 (7.5 (105-107.5)); Set 2: 1x4 @ 105kg RPE 7.5 (7.5 (105-107.5)); Set 3: 1x4 @ 105kg RPE 7.5 (7.5 (105-107.5)); Set 4: 1x4 @ 100kg RPE 7.5 (7.5 (105-107.5))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 105,
                            "targetRpe": 7.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 105,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 105,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetLoad": 100,
                            "targetRpe": 7.5
                  }
        ]
      
            },
            {
              "exerciseName": "Leg Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Arm Tricep Ext",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 4,
              "targetLoad": 167.5,
              "targetPercent": 71.3,
              "targetRpe": 7.0,
              "notes": "Set 1 - film: 1x4 @ 167.5kg RPE 7 (7 (167.5-170)); Set 2: 1x4 @ 167.5kg RPE 7 (7 (167.5-170)); Set 3: 1x4 @ 167.5kg RPE 7 (7 (167.5-170))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 167.5,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 167.5,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 167.5,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip Bench",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 92.5,
              "targetPercent": 71.2,
              "targetRpe": 7.5,
              "notes": "Set 1 - film: 1x8 @ 92.5kg RPE 7.5 (7.5 (92.5-95)); Set 2: 1x8 @ 92.5kg RPE 7.5 (7.5 (92.5-95)); Set 3: 1x8 @ 92.5kg RPE 7.5 (7.5 (92.5-95))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 8,
                            "targetLoad": 92.5,
                            "targetRpe": 7.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetLoad": 92.5,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 8,
                            "targetLoad": 92.5,
                            "targetRpe": 7.5
                  }
        ]
      
            },
            {
              "exerciseName": "45 Degree Back Ext",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 61.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Lat Pull Down",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 102.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Chest Supported Row",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 87.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Bicep Curl",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 15.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Squat",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 4,
              "targetLoad": 115.0,
              "targetPercent": 67.6,
              "targetRpe": 7.0,
              "notes": "Set 1 - film: 1x4 @ 115kg RPE 7 (7 (115-117.5)); Set 2: 1x4 @ 115kg RPE 7 (7 (115-117.5)); Set 3: 1x4 @ 115kg RPE 7 (7 (115-117.5))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 115,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 115,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 115,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 107.5,
              "targetPercent": 82.7,
              "targetRpe": 8.5,
              "notes": "Top Set  - film: 1x3 @ 107.5kg RPE 8.5 (8.5 (107.5-110)); Set 1  - film: 1x5 @ 100kg RPE 8.5; Set 2: 1x5 @ 100kg RPE 8; Set 3: 1x5 @ 100kg RPE 8",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetLoad": 107.5,
                            "targetRpe": 8.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 100,
                            "targetRpe": 8.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 100,
                            "targetRpe": 8
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 100,
                            "targetRpe": 8
                  }
        ]
      
            },
            {
              "exerciseName": "Bulgarian Split Squat",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 25.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Pec Fly",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 85.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Tricep Ext",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 50.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 197.5,
              "targetPercent": 84.0,
              "targetRpe": 8.5,
              "notes": "Top Set  - film: 1x3 @ 197.5kg RPE 8.5 (8.5 (185-187.5)); Set 2 - film: 1x4 @ 177.5kg RPE 8; Set 3: 1x4 @ 177.5kg RPE 8; Set 3: 1x4 @ 177.5kg RPE 8",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetLoad": 197.5,
                            "targetRpe": 8.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 177.5,
                            "targetRpe": 8,
                            "notes": "Set 2 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 177.5,
                            "targetRpe": 8
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 177.5,
                            "targetRpe": 8
                  }
        ]
      
            },
            {
              "exerciseName": "3:2:0 tempo Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 92.5,
              "targetPercent": 71.2,
              "targetRpe": 6.5,
              "notes": "Set 1 - film: 1x3 @ 92.5kg RPE 6.5; Set 2: 1x3 @ 92.5kg RPE 6.5; Set 3: 1x3 @ 92.5kg RPE 6.5; Set 4: 1x3 @ 92.5kg RPE 6.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 92.5,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 92.5,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 92.5,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 92.5,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Seated Dumbbell Overhead Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 30.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Chest Supported Row",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 81.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "DB Hammer Curl",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 17.5,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 5,
      "phase": "accumulation",
      "focus": "Block A Week 5/5",
      "notes": "Imported from Brad workbook sheet A 55 (A 5/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 130.0,
              "targetPercent": 76.5,
              "targetRpe": 9.5,
              "notes": "Top Set -film: 1x3 @ 130kg RPE 9.5 (9.5 (125-130)); Set 1 - film: 1x3 @ 115kg RPE 7.5; Set 2: 1x3 @ 115kg RPE 7.5; Set 3: 1x3 @ 115kg RPE 7.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetLoad": 130,
                            "targetRpe": 9.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 115,
                            "targetRpe": 7.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 115,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 115,
                            "targetRpe": 7.5
                  }
        ]
      
            },
            {
              "exerciseName": "Bench Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 4,
              "targetLoad": 107.5,
              "targetPercent": 82.7,
              "targetRpe": 8.0,
              "notes": "Set 1 - film: 1x4 @ 107.5kg RPE 8 (8 (107.5)); Set 2: 1x4 @ 107.5kg RPE 8 (8 (107.5)); Set 3: 1x4 @ 107.5kg RPE 8 (8 (107.5))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 107.5,
                            "targetRpe": 8,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 107.5,
                            "targetRpe": 8
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 107.5,
                            "targetRpe": 8
                  }
        ]
      
            },
            {
              "exerciseName": "Leg Press",
              "orderIndex": 2,
              "targetSets": 2,
              "targetReps": 10,
              "targetRpe": 9.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 2,
              "targetReps": 12,
              "targetRpe": 9.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Arm Tricep Ext",
              "orderIndex": 4,
              "targetSets": 2,
              "targetReps": 12,
              "targetRpe": 9.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Deadlift",
              "orderIndex": 0,
              "targetSets": 2,
              "targetReps": 4,
              "targetLoad": 172.5,
              "targetPercent": 73.4,
              "targetRpe": 7.5,
              "notes": "Set 1 - film: 1x4 @ 172.5kg RPE 7.5 (7.5 (172.5-177.5)); Set 2: 1x4 @ 172.5kg RPE 7.5 (7.5 (172.5-177.5))"
            },
            {
              "exerciseName": "Close Grip Bench",
              "orderIndex": 1,
              "targetSets": 2,
              "targetReps": 8,
              "targetLoad": 95.0,
              "targetPercent": 73.1,
              "targetRpe": 8.0,
              "notes": "Set 1 - film: 1x8 @ 95kg RPE 8 (8 (95-97.5)); Set 2: 1x8 @ 95kg RPE 8 (8 (95-97.5))"
            },
            {
              "exerciseName": "45 Degree Back Ext",
              "orderIndex": 2,
              "targetSets": 2,
              "targetReps": 10,
              "targetLoad": 69.0,
              "targetRpe": 9.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Lat Pull Down",
              "orderIndex": 3,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 95.0,
              "targetRpe": 9.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Chest Supported Row",
              "orderIndex": 4,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 85.0,
              "targetRpe": 9.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Bicep Curl",
              "orderIndex": 5,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 15.0,
              "targetRpe": 9.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Squat",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 4,
              "targetPercent": 0.0,
              "targetRpe": 7.5,
              "notes": "Set 1 - film: 1x4 RPE 7.5 (7.5 (120)); Set 2: 1x4 RPE 7.5 (7.5 (120)); Set 3: 1x4 RPE 7.5 (7.5 (120))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetRpe": 7.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetRpe": 7.5
                  }
        ]
      
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 110.0,
              "targetPercent": 84.6,
              "targetRpe": 9.5,
              "notes": "Top Set  - film: 1x3 @ 110kg RPE 9.5 (9.5 (110-112.5)); Set 1  - film: 1x4 @ 100kg RPE 8; Set 2: 1x4 @ 100kg RPE 8.5; Set 3: 1x4 @ 100kg RPE 8.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetLoad": 110,
                            "targetRpe": 9.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 100,
                            "targetRpe": 8,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 100,
                            "targetRpe": 8.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 100,
                            "targetRpe": 8.5
                  }
        ]
      
            },
            {
              "exerciseName": "Bulgarian Split Squat",
              "orderIndex": 2,
              "targetSets": 2,
              "targetReps": 10,
              "targetRpe": 9.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Pec Fly",
              "orderIndex": 3,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 90.0,
              "targetRpe": 9.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Tricep Ext",
              "orderIndex": 4,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 70.0,
              "targetRpe": 9.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 3,
              "targetLoad": 205.0,
              "targetPercent": 87.2,
              "targetRpe": 9.5,
              "notes": "Top Set  - film: 1x3 @ 205kg RPE 9.5; Set 2 - film: 1x3 @ 185kg; Set 3: 1x3 @ 185kg",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetLoad": 205,
                            "targetRpe": 9.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 185,
                            "notes": "Set 2 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 185
                  }
        ]
      
            },
            {
              "exerciseName": "3:2:0 tempo Bench",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 3,
              "targetLoad": 95.0,
              "targetPercent": 73.1,
              "targetRpe": 7.0,
              "notes": "Set 1 - film: 1x3 @ 95kg RPE 7; Set 2: 1x3 @ 95kg RPE 7; Set 3: 1x3 @ 95kg RPE 7",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 95,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 95,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 95,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Seated Dumbbell Overhead Press",
              "orderIndex": 2,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 30.0,
              "targetRpe": 9.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Chest Supported Row",
              "orderIndex": 3,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 85.0,
              "targetRpe": 9.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "DB Hammer Curl",
              "orderIndex": 4,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 17.5,
              "targetRpe": 9.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 6,
      "phase": "intensification",
      "focus": "Block B Week 1/5",
      "notes": "Imported from Brad workbook sheet B 15 (B 1/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 1,
              "targetLoad": 115.0,
              "targetPercent": 67.6,
              "targetRpe": 5.5,
              "notes": "Top Set -film: 1x1 @ 115kg RPE 5.5; Set 1 - film: 1x5 @ 105kg RPE 5; Set 2: 1x5 @ 100kg RPE 5; Set 3: 1x5 @ 100kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 115,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 105,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 100,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 100,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "2 Second Pause Bench",
              "orderIndex": 1,
              "targetSets": 6,
              "targetReps": 3,
              "targetLoad": 95.0,
              "targetPercent": 73.1,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x3 @ 95kg RPE 6; Set 2: 1x3 @ 95kg RPE 6; Set 3: 1x3 @ 95kg RPE 6; Set 4: 1x3 @ 95kg RPE 6; Set 5: 1x3 @ 95kg RPE 6; Set 6: 1x3 @ 95kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 95,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 95,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 95,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 95,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 5",
                            "targetReps": 3,
                            "targetLoad": 95,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 6,
                            "setLabel": "Set 6",
                            "targetReps": 3,
                            "targetLoad": 95,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Single Leg Leg Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 55.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell RDL",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 40.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Tricep Push Down",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 65.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 6,
              "targetLoad": 150.0,
              "targetPercent": 63.8,
              "targetRpe": 5.5,
              "notes": "Set 1 - film: 1x6 @ 150kg RPE 5.5; Set 2: 1x6 @ 150kg RPE 5.5; Set 3: 1x6 @ 150kg RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 6,
                            "targetLoad": 150,
                            "targetRpe": 5.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 6,
                            "targetLoad": 150,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 6,
                            "targetLoad": 150,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Bench Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 100.0,
              "targetPercent": 76.9,
              "targetRpe": 5.5,
              "notes": "Set 1 - film: 1x5 @ 100kg RPE 5.5; Set 2: 1x5 @ 95kg RPE 5; Set 3: 1x5 @ 95kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 100,
                            "targetRpe": 5.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 95,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 95,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Single Arm Lat Pull Down",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 40.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Wide Grip Seated Cable Row",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 80.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Rear Delt Fly",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 12.5,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Bicep Curl",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 17.5,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Squat",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 110.0,
              "targetPercent": 64.7,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x5 @ 110kg RPE 5; Set 2: 1x5 @ 110kg RPE 5; Set 3: 1x5 @ 110kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 110,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 110,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 110,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 6,
              "targetReps": 1,
              "targetLoad": 105.0,
              "targetPercent": 80.8,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x1 @ 105kg RPE 5.5; Set 1  - film: 1x3 @ 95kg RPE 5; Set 2: 1x3 @ 95kg RPE 5; Set 3: 1x3 @ 95kg RPE 5; Set 4: 1x3 @ 95kg RPE 5; Set 5: 1x3 @ 95kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 105,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 95,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 95,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 95,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 95,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 6,
                            "setLabel": "Set 5",
                            "targetReps": 3,
                            "targetLoad": 95,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Quad Extension",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 85.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Low Incline Dumbbell Bench Press",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 35.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Overhead Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 12.5,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 1,
              "targetLoad": 170.0,
              "targetPercent": 72.3,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x1 @ 170kg RPE 5.5; Set 1 - film: 1x3 @ 155kg RPE 5; Set 2: 1x3 @ 155kg RPE 5; Set 3: 1x3 @ 155kg RPE 5; Set 4: 1x3 @ 155kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 170,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 155,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 155,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 155,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 155,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Larsen Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 6,
              "targetLoad": 90.0,
              "targetPercent": 69.2,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x6 @ 90kg RPE 6; Set 2: 1x6 @ 90kg RPE 6; Set 3: 1x6 @ 90kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 6,
                            "targetLoad": 90,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 6,
                            "targetLoad": 90,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 6,
                            "targetLoad": 90,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Barbell Overhead Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 52.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Lateral Raise",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 15.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Pull Ups",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 92.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 40.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 7,
      "phase": "intensification",
      "focus": "Block B Week 2/5",
      "notes": "Imported from Brad workbook sheet B 25 (B 2/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 1,
              "targetLoad": 125.0,
              "targetPercent": 73.5,
              "targetRpe": 6.5,
              "notes": "Top Set -film: 1x1 @ 125kg RPE 6.5; Set 1 - film: 1x5 @ 110kg RPE 6; Set 2: 1x5 @ 110kg RPE 6; Set 3: 1x5 @ 110kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 125,
                            "targetRpe": 6.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 110,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 110,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 110,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "2 Second Pause Bench",
              "orderIndex": 1,
              "targetSets": 6,
              "targetReps": 3,
              "targetLoad": 97.5,
              "targetPercent": 75.0,
              "targetRpe": 6.5,
              "notes": "Set 1 - film: 1x3 @ 97.5kg RPE 6.5; Set 2: 1x3 @ 97.5kg RPE 6.5; Set 3: 1x3 @ 97.5kg RPE 6.5; Set 4: 1x3 @ 97.5kg RPE 6.5; Set 5: 1x3 @ 97.5kg RPE 6.5; Set 6: 1x3 @ 97.5kg RPE 6.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 97.5,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 97.5,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 97.5,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 97.5,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 5",
                            "targetReps": 3,
                            "targetLoad": 97.5,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 6,
                            "setLabel": "Set 6",
                            "targetReps": 3,
                            "targetLoad": 97.5,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Single Leg Leg Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 55.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell RDL",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 40.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Tricep Push Down",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 65.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 6,
              "targetLoad": 160.0,
              "targetPercent": 68.1,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x6 @ 160kg RPE 6; Set 2: 1x6 @ 160kg RPE 6; Set 3: 1x6 @ 160kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 6,
                            "targetLoad": 160,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 6,
                            "targetLoad": 160,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 6,
                            "targetLoad": 160,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Bench Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 105.0,
              "targetPercent": 80.8,
              "targetRpe": 6.5,
              "notes": "Set 1 - film: 1x5 @ 105kg RPE 6.5 (6.5 (105)); Set 2: 1x5 @ 100kg; Set 3: 1x5 @ 100kg",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 105,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 100
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 100
                  }
        ]
      
            },
            {
              "exerciseName": "Single Arm Lat Pull Down",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 41.6,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Wide Grip Seated Cable Row",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 75.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Rear Delt Fly",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 12.5,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Bicep Curl",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 17.5,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Squat",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 115.0,
              "targetPercent": 67.6,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x5 @ 115kg RPE 6; Set 2: 1x5 @ 105kg RPE 6; Set 3: 1x5 @ 100kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 115,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 105,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 100,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 6,
              "targetReps": 1,
              "targetLoad": 110.0,
              "targetPercent": 84.6,
              "targetRpe": 6.5,
              "notes": "Top Set  - film: 1x1 @ 110kg RPE 6.5; Set 1  - film: 1x3 @ 100kg RPE 6; Set 2: 1x3 @ 100kg RPE 6; Set 3: 1x3 @ 100kg RPE 6; Set 4: 1x3 @ 100kg RPE 6; Set 5: 1x3 @ 100kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 110,
                            "targetRpe": 6.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 100,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 100,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 100,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 100,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 6,
                            "setLabel": "Set 5",
                            "targetReps": 3,
                            "targetLoad": 100,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Quad Extension",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 80.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Low Incline Dumbbell Bench Press",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 35.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Overhead Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 12.5,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 1,
              "targetLoad": 180.0,
              "targetPercent": 76.6,
              "targetRpe": 6.5,
              "notes": "Top Set  - film: 1x1 @ 180kg RPE 6.5; Set 1 - film: 1x3 @ 165kg RPE 6; Set 2: 1x3 @ 165kg RPE 6; Set 3: 1x3 @ 165kg RPE 6; Set 4: 1x3 @ 165kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 180,
                            "targetRpe": 6.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 165,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 165,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 165,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 165,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Larsen Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 6,
              "targetPercent": 0.0,
              "targetRpe": 6.5,
              "notes": "Set 1 - film: 1x6 RPE 6.5; Set 2: 1x6 RPE 6.5; Set 3: 1x6 RPE 6.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 6,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 6,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 6,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Barbell Overhead Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Lateral Raise",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Pull Ups",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 8,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 8,
      "phase": "intensification",
      "focus": "Block B Week 3/5",
      "notes": "Imported from Brad workbook sheet B 35 (B 3/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 1,
              "targetLoad": 130.0,
              "targetPercent": 76.5,
              "targetRpe": 7.5,
              "notes": "Top Set -film: 1x1 @ 130kg RPE 7.5; Set 1 - film: 1x5 @ 110kg RPE 6.5; Set 2: 1x5 @ 110kg RPE 6.5; Set 3: 1x5 @ 100kg RPE 6.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 130,
                            "targetRpe": 7.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 110,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 110,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 100,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "2 Second Pause Bench",
              "orderIndex": 1,
              "targetSets": 6,
              "targetReps": 3,
              "targetLoad": 100.0,
              "targetPercent": 76.9,
              "targetRpe": 7.0,
              "notes": "Set 1 - film: 1x3 @ 100kg RPE 7; Set 2: 1x3 @ 100kg RPE 7; Set 3: 1x3 @ 100kg RPE 7; Set 4: 1x3 @ 100kg RPE 7; Set 5: 1x3 @ 100kg RPE 7; Set 6: 1x3 @ 100kg RPE 7",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 100,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 100,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 100,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 100,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 5",
                            "targetReps": 3,
                            "targetLoad": 100,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 6,
                            "setLabel": "Set 6",
                            "targetReps": 3,
                            "targetLoad": 100,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Single Leg Leg Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 70.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell RDL",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 45.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Tricep Push Down",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 65.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 6,
              "targetLoad": 165.0,
              "targetPercent": 70.2,
              "targetRpe": 6.5,
              "notes": "Set 1 - film: 1x6 @ 165kg RPE 6.5; Set 2: 1x6 @ 165kg RPE 6.5; Set 3: 1x6 @ 165kg RPE 6.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 6,
                            "targetLoad": 165,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 6,
                            "targetLoad": 165,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 6,
                            "targetLoad": 165,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Bench Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 107.5,
              "targetPercent": 82.7,
              "targetRpe": 7.0,
              "notes": "Set 1 - film: 1x5 @ 107.5kg RPE 7; Set 2: 1x5 @ 102.5kg RPE 7; Set 3: 1x5 @ 102.5kg RPE 7",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 107.5,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 102.5,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 102.5,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Single Arm Lat Pull Down",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 41.6,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Wide Grip Seated Cable Row",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 75.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Rear Delt Fly",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 12.5,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Bicep Curl",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 17.5,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Squat",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 115.0,
              "targetPercent": 67.6,
              "targetRpe": 6.5,
              "notes": "Set 1 - film: 1x5 @ 115kg RPE 6.5; Set 2: 1x5 @ 115kg RPE 6.5; Set 3: 1x5 @ 115kg RPE 6.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 115,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 115,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 115,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 6,
              "targetReps": 1,
              "targetLoad": 115.0,
              "targetPercent": 88.5,
              "targetRpe": 7.5,
              "notes": "Top Set  - film: 1x1 @ 115kg RPE 7.5; Set 1  - film: 1x3 @ 105kg RPE 6.5; Set 2: 1x3 @ 105kg RPE 6.5; Set 3: 1x3 @ 105kg RPE 6.5; Set 4: 1x3 @ 105kg RPE 6.5; Set 5: 1x3 @ 105kg RPE 6.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 115,
                            "targetRpe": 7.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 105,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 105,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 105,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 105,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 6,
                            "setLabel": "Set 5",
                            "targetReps": 3,
                            "targetLoad": 105,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Quad Extension",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 85.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Low Incline Dumbbell Bench Press",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 35.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Overhead Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 10.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 1,
              "targetLoad": 195.0,
              "targetPercent": 83.0,
              "targetRpe": 7.5,
              "notes": "Top Set  - film: 1x1 @ 195kg RPE 7.5; Set 1 - film: 1x3 @ 170kg RPE 6.5; Set 2: 1x3 @ 170kg RPE 6.5; Set 3: 1x3 @ 170kg RPE 6.5; Set 4: 1x3 @ 170kg RPE 6.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 195,
                            "targetRpe": 7.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 170,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 170,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 170,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 170,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Larsen Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 6,
              "targetLoad": 95.0,
              "targetPercent": 73.1,
              "targetRpe": 7.0,
              "notes": "Set 1 - film: 1x6 @ 95kg RPE 7; Set 2: 1x6 @ 95kg RPE 7; Set 3: 1x6 @ 95kg RPE 7",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 6,
                            "targetLoad": 95,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 6,
                            "targetLoad": 95,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 6,
                            "targetLoad": 95,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Barbell Overhead Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 57.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Lateral Raise",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 15.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Pull Ups",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 92.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 40.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 9,
      "phase": "intensification",
      "focus": "Block B Week 4/5",
      "notes": "Imported from Brad workbook sheet B 45 (B 4/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 1,
              "targetLoad": 135.0,
              "targetPercent": 79.4,
              "targetRpe": 8.5,
              "notes": "Top Set -film: 1x1 @ 135kg RPE 8.5 (8.5 (135-137.5)); Set 1 - film: 1x5 @ 115kg RPE 7 (7 (115)); Set 2: 1x5 @ 115kg RPE 7 (7 (115)); Set 3: 1x5 @ 115kg RPE 7 (7 (115))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 135,
                            "targetRpe": 8.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 115,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 115,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 115,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "2 Second Pause Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 3,
              "targetLoad": 105.0,
              "targetPercent": 80.8,
              "targetRpe": 7.5,
              "notes": "Set 1 - film: 1x3 @ 105kg RPE 7.5 (7.5 (105)); Set 2: 1x3 @ 105kg RPE 7.5 (7.5 (105)); Set 3: 1x3 @ 105kg RPE 7.5 (7.5 (105)); Set 4: 1x3 @ 105kg RPE 7.5 (7.5 (105)); Set 5: 1x3 @ 105kg RPE 7.5 (7.5 (105))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 105,
                            "targetRpe": 7.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 105,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 105,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 105,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 5",
                            "targetReps": 3,
                            "targetLoad": 105,
                            "targetRpe": 7.5
                  }
        ]
      
            },
            {
              "exerciseName": "Single Leg Leg Press",
              "orderIndex": 2,
              "targetSets": 2,
              "targetReps": 10,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell RDL",
              "orderIndex": 3,
              "targetSets": 2,
              "targetReps": 10,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Tricep Push Down",
              "orderIndex": 4,
              "targetSets": 2,
              "targetReps": 12,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 2,
              "targetReps": 6,
              "targetLoad": 170.0,
              "targetPercent": 72.3,
              "targetRpe": 7.0,
              "notes": "Set 1 - film: 1x6 @ 170kg RPE 7 (7 (170)); Set 2: 1x6 @ 170kg RPE 7 (7 (170))"
            },
            {
              "exerciseName": "Bench Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 110.0,
              "targetPercent": 84.6,
              "targetRpe": 7.5,
              "notes": "Set 1 - film: 1x5 @ 110kg RPE 7.5 (7.5 (110)); Set 2: 1x5 @ 105kg RPE 7.5; Set 3: 1x5 @ 105kg RPE 8.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 110,
                            "targetRpe": 7.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 105,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 105,
                            "targetRpe": 8.5
                  }
        ]
      
            },
            {
              "exerciseName": "Single Arm Lat Pull Down",
              "orderIndex": 2,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 41.6,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Wide Grip Seated Cable Row",
              "orderIndex": 3,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 75.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Rear Delt Fly",
              "orderIndex": 4,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 12.5,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Bicep Curl",
              "orderIndex": 5,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 17.5,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Squat",
              "orderIndex": 0,
              "targetSets": 2,
              "targetReps": 5,
              "targetLoad": 120.0,
              "targetPercent": 70.6,
              "targetRpe": 7.0,
              "notes": "Set 1 - film: 1x5 @ 120kg RPE 7 (7 (120)); Set 2: 1x5 @ 120kg RPE 7 (7 (120))"
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 1,
              "targetLoad": 117.5,
              "targetPercent": 90.4,
              "targetRpe": 8.5,
              "notes": "Top Set  - film: 1x1 @ 117.5kg RPE 8.5 (8.5 (117.5-120)); Set 1  - film: 1x3 @ 107.5kg RPE 7.5 (7.5 (107.5)); Set 2: 1x3 @ 107.5kg RPE 7.5 (7.5 (107.5)); Set 3: 1x3 @ 107.5kg RPE 7.5 (7.5 (107.5)); Set 4: 1x3 @ 107.5kg RPE 7.5 (7.5 (107.5))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 117.5,
                            "targetRpe": 8.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 107.5,
                            "targetRpe": 7.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 107.5,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 107.5,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 107.5,
                            "targetRpe": 7.5
                  }
        ]
      
            },
            {
              "exerciseName": "Quad Extension",
              "orderIndex": 2,
              "targetSets": 2,
              "targetReps": 10,
              "targetLoad": 85.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Low Incline Dumbbell Bench Press",
              "orderIndex": 3,
              "targetSets": 2,
              "targetReps": 10,
              "targetLoad": 35.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Overhead Tricep Extension",
              "orderIndex": 4,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 10.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 1,
              "targetLoad": 205.0,
              "targetPercent": 87.2,
              "targetRpe": 8.5,
              "notes": "Top Set  - film: 1x1 @ 205kg RPE 8.5 (8.5 (202.5-205)); Set 1 - film: 1x3 @ 175kg RPE 7.5 (7.5 (175-177.5)); Set 2: 1x3 @ 175kg RPE 7.5 (7.5 (175-177.5)); Set 3: 1x3 @ 175kg RPE 7.5 (7.5 (175-177.5)); Set 4: 1x3 @ 175kg RPE 7.5 (7.5 (175-177.5))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 205,
                            "targetRpe": 8.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 175,
                            "targetRpe": 7.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 175,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 175,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 175,
                            "targetRpe": 7.5
                  }
        ]
      
            },
            {
              "exerciseName": "Larsen Press",
              "orderIndex": 1,
              "targetSets": 2,
              "targetReps": 6,
              "targetLoad": 100.0,
              "targetPercent": 76.9,
              "targetRpe": 7.5,
              "notes": "Set 1 - film: 1x6 @ 100kg RPE 7.5 (7.5 (97.5)); Set 2: 1x6 @ 100kg RPE 7.5 (7.5 (97.5))"
            },
            {
              "exerciseName": "Barbell Overhead Press",
              "orderIndex": 2,
              "targetSets": 2,
              "targetReps": 10,
              "targetLoad": 57.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Lateral Raise",
              "orderIndex": 3,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 15.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Pull Ups",
              "orderIndex": 4,
              "targetSets": 2,
              "targetReps": 8,
              "targetLoad": 92.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 5,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 40.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 10,
      "phase": "intensification",
      "focus": "Block B Week 5/5",
      "notes": "Imported from Brad workbook sheet B 55 (B 5/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 1,
              "targetLoad": 140.0,
              "targetPercent": 82.4,
              "targetRpe": 9.5,
              "notes": "Top Set -film: 1x1 @ 140kg RPE 9.5 (9.5 (140-142.5)); Set 1 - film: 1x4 @ 120kg RPE 7.5 (7.5 (117.5-120)); Set 2: 1x4 @ 120kg RPE 7.5 (7.5 (117.5-120)); Set 3: 1x4 @ 120kg RPE 7.5 (7.5 (117.5-120))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 140,
                            "targetRpe": 9.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 120,
                            "targetRpe": 7.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 120,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 120,
                            "targetRpe": 7.5
                  }
        ]
      
            },
            {
              "exerciseName": "2 Second Pause Bench",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 3,
              "targetLoad": 107.5,
              "targetPercent": 82.7,
              "targetRpe": 8.0,
              "notes": "Set 1 - film: 1x3 @ 107.5kg RPE 8 (8 (107.5)); Set 2: 1x3 @ 107.5kg RPE 8 (8 (107.5)); Set 3: 1x3 @ 100kg RPE 8 (8 (107.5))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 107.5,
                            "targetRpe": 8,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 107.5,
                            "targetRpe": 8
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 100,
                            "targetRpe": 8
                  }
        ]
      
            },
            {
              "exerciseName": "Single Leg Leg Press",
              "orderIndex": 2,
              "targetSets": 2,
              "targetReps": 10,
              "targetLoad": 75.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell RDL",
              "orderIndex": 3,
              "targetSets": 2,
              "targetReps": 10,
              "targetLoad": 40.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Tricep Push Down",
              "orderIndex": 4,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 70.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 2,
              "targetReps": 6,
              "targetLoad": 175.0,
              "targetPercent": 74.5,
              "targetRpe": 7.5,
              "notes": "Set 1 - film: 1x6 @ 175kg RPE 7.5 (7.5 (175-177.5)); Set 2: 1x6 @ 175kg RPE 7.5 (7.5 (175-177.5))"
            },
            {
              "exerciseName": "Bench Press",
              "orderIndex": 1,
              "targetSets": 2,
              "targetReps": 5,
              "targetLoad": 95.0,
              "targetPercent": 73.1,
              "notes": "Set 1 - film: 1x5 @ 95kg; Set 2: 1x5 @ 95kg"
            },
            {
              "exerciseName": "Single Arm Lat Pull Down",
              "orderIndex": 2,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 40.8,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Wide Grip Seated Cable Row",
              "orderIndex": 3,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 75.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Rear Delt Fly",
              "orderIndex": 4,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 25.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Bicep Curl",
              "orderIndex": 5,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 17.5,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Squat",
              "orderIndex": 0,
              "targetSets": 2,
              "targetReps": 5,
              "targetLoad": 110.0,
              "targetPercent": 64.7,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x5 @ 110kg RPE 6 (6 (110)); Set 2: 1x5 @ 110kg RPE 6 (6 (110))"
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 1,
              "targetLoad": 120.0,
              "targetPercent": 92.3,
              "targetRpe": 9.5,
              "notes": "Top Set  - film: 1x1 @ 120kg RPE 9.5 (9.5 (120)); Set 1  - film: 1x2 @ 110kg RPE 8 (8 (110)); Set 2: 1x2 @ 110kg RPE 8 (8 (110)); Set 3: 1x2 @ 110kg RPE 8 (8 (110))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 120,
                            "targetRpe": 9.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 2,
                            "targetLoad": 110,
                            "targetRpe": 8,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetLoad": 110,
                            "targetRpe": 8
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetLoad": 110,
                            "targetRpe": 8
                  }
        ]
      
            },
            {
              "exerciseName": "Quad Extension",
              "orderIndex": 2,
              "targetSets": 2,
              "targetReps": 10,
              "targetLoad": 80.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Low Incline Dumbbell Bench Press",
              "orderIndex": 3,
              "targetSets": 2,
              "targetReps": 10,
              "targetLoad": 40.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Overhead Tricep Extension",
              "orderIndex": 4,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 12.5,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 1,
              "targetLoad": 220.0,
              "targetPercent": 93.6,
              "targetRpe": 9.5,
              "notes": "Top Set  - film: 1x1 @ 220kg RPE 9.5; Set 1 - film: 1x2 @ 200kg RPE 8; Set 2: 1x2 @ 190kg RPE 8; Set 3: 1x2 @ 190kg RPE 8",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 220,
                            "targetRpe": 9.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 2,
                            "targetLoad": 200,
                            "targetRpe": 8,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetLoad": 190,
                            "targetRpe": 8
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetLoad": 190,
                            "targetRpe": 8
                  }
        ]
      
            },
            {
              "exerciseName": "Larsen Press",
              "orderIndex": 1,
              "targetSets": 2,
              "targetReps": 6,
              "targetLoad": 95.0,
              "targetPercent": 73.1,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x6 @ 95kg RPE 6; Set 2: 1x6 @ 95kg RPE 6"
            },
            {
              "exerciseName": "Barbell Overhead Press",
              "orderIndex": 2,
              "targetSets": 2,
              "targetReps": 10,
              "targetLoad": 60.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Lateral Raise",
              "orderIndex": 3,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 15.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Pull Ups",
              "orderIndex": 4,
              "targetSets": 2,
              "targetReps": 8,
              "targetLoad": 92.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 5,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 40.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 11,
      "phase": "intensification",
      "focus": "Block C Week 1/5",
      "notes": "Imported from Brad workbook sheet C 15 (C 1/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 105.0,
              "targetPercent": 61.8,
              "targetRpe": 5.5,
              "notes": "Top Set -film: 1x5 @ 105kg RPE 5.5; Set 1 - film: 1x6 @ 95kg RPE 5; Set 2: 1x6 @ 95kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 5,
                            "targetLoad": 105,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 6,
                            "targetLoad": 95,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 6,
                            "targetLoad": 95,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 4,
              "targetLoad": 95.0,
              "targetPercent": 73.1,
              "targetRpe": 5.5,
              "notes": "Set 1 - film: 1x4 @ 95kg RPE 5.5; Set 2: 1x4 @ 95kg RPE 5.5; Set 3: 1x4 @ 95kg RPE 5.5; Set 4: 1x4 @ 90kg RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 95,
                            "targetRpe": 5.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 95,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 95,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetLoad": 90,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Bulgarian Split Squat",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 25.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Leg Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 30.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Arm Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 12.5,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 3,
              "targetLoad": 155.0,
              "targetPercent": 66.0,
              "targetRpe": 5.5,
              "notes": "Set 1 - film: 1x3 @ 155kg RPE 5.5; Set 2: 1x3 @ 155kg RPE 5.5; Set 3: 1x3 @ 155kg RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 155,
                            "targetRpe": 5.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 155,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 155,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Barbell RDL",
              "orderIndex": 1,
              "targetSets": 2,
              "targetReps": 8,
              "targetLoad": 100.0,
              "targetPercent": 42.6,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x8 @ 100kg RPE 6; Set 2: 1x8 @ 100kg RPE 6"
            },
            {
              "exerciseName": "Pause Bench Press",
              "orderIndex": 2,
              "targetSets": 5,
              "targetReps": 2,
              "targetLoad": 100.0,
              "targetPercent": 76.9,
              "targetRpe": 5.5,
              "notes": "Set 1 - film: 1x2 @ 100kg RPE 5.5; Set 2: 1x2 @ 100kg RPE 5.5; Set 3: 1x2 @ 100kg RPE 5.5; Set 4: 1x6 @ 90kg RPE 5.5; Set 5: 1x6 @ 90kg RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 2,
                            "targetLoad": 100,
                            "targetRpe": 5.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetLoad": 100,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetLoad": 100,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 6,
                            "targetLoad": 90,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 5",
                            "targetReps": 6,
                            "targetLoad": 90,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Dumbbell Row",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 45.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Face Pulls",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 45.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Lateral Raise",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 25.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Hammer Curl",
              "orderIndex": 6,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "3:2:0 Tempo Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 105.0,
              "targetPercent": 61.8,
              "targetRpe": 5.5,
              "notes": "Set 1 - film: 1x3 @ 105kg RPE 5.5; Set 2: 1x3 @ 105kg RPE 5.5; Set 3: 1x3 @ 105kg RPE 5.5; Set 4: 1x3 @ 105kg RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 105,
                            "targetRpe": 5.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 105,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 105,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 105,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 105.0,
              "targetPercent": 80.8,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x5 @ 105kg RPE 5.5; Set 1  - film: 1x5 @ 100kg; Set 2: 1x5 @ 100kg",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 5,
                            "targetLoad": 105,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 100,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 100
                  }
        ]
      
            },
            {
              "exerciseName": "Weighted Dips",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 10.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Pec Fly",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 25.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Stright Bar Tricep Push Down",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 55.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Walking Lunge",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 10,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 160.0,
              "targetPercent": 68.1,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x5 @ 160kg RPE 5.5; Set 1 - film: 1x5 @ 150kg RPE 5; Set 2: 1x5 @ 150kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 5,
                            "targetLoad": 160,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 150,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 150,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Spoto Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 85.0,
              "targetPercent": 65.4,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x8 @ 85kg RPE 6; Set 2: 1x8 @ 85kg RPE 6; Set 2: 1x8 @ 85kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 8,
                            "targetLoad": 85,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetLoad": 85,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetLoad": 85,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Chest Supported Single Arm Cable Row",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 36.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "T-Bar Row",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 47.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Stright Bar Bicep Curl",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 37.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Hanging Leg Raises",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 10,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 12,
      "phase": "intensification",
      "focus": "Block C Week 2/5",
      "notes": "Imported from Brad workbook sheet C 25 (C 2/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 115.0,
              "targetPercent": 67.6,
              "targetRpe": 6.5,
              "notes": "Top Set -film: 1x5 @ 115kg RPE 6.5 (6.5 (112.5)); Set 1 - film: 1x6 @ 100kg RPE 5.5; Set 2: 1x6 @ 100kg RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 5,
                            "targetLoad": 115,
                            "targetRpe": 6.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 6,
                            "targetLoad": 100,
                            "targetRpe": 5.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 6,
                            "targetLoad": 100,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 4,
              "targetLoad": 100.0,
              "targetPercent": 76.9,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x4 @ 100kg RPE 6 (6 (100)); Set 2: 1x4 @ 100kg RPE 6 (6 (100)); Set 3: 1x4 @ 100kg RPE 6 (6 (100)); Set 4: 1x4 @ 100kg RPE 6 (6 (100))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 100,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 100,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 100,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetLoad": 100,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Bulgarian Split Squat",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 30.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Leg Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 30.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Arm Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 12.5,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 3,
              "targetLoad": 162.5,
              "targetPercent": 69.1,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x3 @ 162.5kg RPE 6 (6 (162.5)); Set 2: 1x3 @ 162.5kg RPE 6 (6 (162.5)); Set 3: 1x3 @ 162.5kg RPE 6 (6 (162.5))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 162.5,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 162.5,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 162.5,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Barbell RDL",
              "orderIndex": 1,
              "targetSets": 2,
              "targetReps": 8,
              "targetLoad": 105.0,
              "targetPercent": 44.7,
              "targetRpe": 6.5,
              "notes": "Set 1 - film: 1x8 @ 105kg RPE 6.5 (6.5 (105)); Set 2: 1x8 @ 105kg RPE 6.5 (6.5 (105))"
            },
            {
              "exerciseName": "Pause Bench Press",
              "orderIndex": 2,
              "targetSets": 5,
              "targetReps": 2,
              "targetLoad": 105.0,
              "targetPercent": 80.8,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x2 @ 105kg RPE 6 (6 (105)); Set 2: 1x2 @ 105kg RPE 6 (6 (105)); Set 3: 1x2 @ 105kg RPE 6 (6 (105)); Set 4: 1x6 @ 92.5kg RPE 6 (6 (92.5-95)); Set 5: 1x6 @ 92.5kg RPE 6 (6 (92.5-95))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 2,
                            "targetLoad": 105,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetLoad": 105,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetLoad": 105,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 6,
                            "targetLoad": 92.5,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 5",
                            "targetReps": 6,
                            "targetLoad": 92.5,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Dumbbell Row",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 45.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Face Pulls",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 45.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Lateral Raise",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 25.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Hammer Curl",
              "orderIndex": 6,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 17.5,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "3:2:0 Tempo Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 110.0,
              "targetPercent": 64.7,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x3 @ 110kg RPE 6 (6 (110)); Set 2: 1x3 @ 110kg RPE 6 (6 (110)); Set 3: 1x3 @ 110kg RPE 6 (6 (110)); Set 4: 1x3 @ 110kg RPE 6 (6 (110))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 110,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 110,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 110,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 110,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 100.0,
              "targetPercent": 76.9,
              "targetRpe": 6.5,
              "notes": "Top Set  - film: 1x5 @ 100kg RPE 6.5 (6.5 (100)); Set 1  - film: 1x5 @ 95kg RPE 7.5; Set 2: 1x5 @ 95kg RPE 7",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 5,
                            "targetLoad": 100,
                            "targetRpe": 6.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 95,
                            "targetRpe": 7.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 95,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Weighted Dips",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 10.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Pec Fly",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 25.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Stright Bar Tricep Push Down",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 60.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Walking Lunge",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 15.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 170.0,
              "targetPercent": 72.3,
              "targetRpe": 6.5,
              "notes": "Top Set  - film: 1x5 @ 170kg RPE 6.5; Set 1 - film: 1x5 @ 157.5kg RPE 5; Set 2: 1x5 @ 157.5kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 5,
                            "targetLoad": 170,
                            "targetRpe": 6.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 157.5,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 157.5,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Spoto Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 87.5,
              "targetPercent": 67.3,
              "targetRpe": 6.5,
              "notes": "Set 1 - film: 1x8 @ 87.5kg RPE 6.5; Set 2: 1x8 @ 87.5kg RPE 6.5; Set 2: 1x8 @ 87.5kg RPE 6.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 8,
                            "targetLoad": 87.5,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetLoad": 87.5,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetLoad": 87.5,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Chest Supported Single Arm Cable Row",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 40.5,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "T-Bar Row",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 47.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Stright Bar Bicep Curl",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 37.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Hanging Leg Raises",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 10,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 13,
      "phase": "intensification",
      "focus": "Block C Week 3/5",
      "notes": "Imported from Brad workbook sheet C 35 (C 3/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 122.5,
              "targetPercent": 72.1,
              "targetRpe": 7.5,
              "notes": "Top Set -film: 1x5 @ 122.5kg RPE 7.5 (7.5 (122.5)); Set 1 - film: 1x6 @ 107.5kg; Set 2: 1x6 @ 107.5kg",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 5,
                            "targetLoad": 122.5,
                            "targetRpe": 7.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 6,
                            "targetLoad": 107.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 6,
                            "targetLoad": 107.5
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 4,
              "targetLoad": 105.0,
              "targetPercent": 80.8,
              "targetRpe": 6.5,
              "notes": "Set 1 - film: 1x4 @ 105kg RPE 6.5 (6.5-7 (105)); Set 2: 1x4 @ 105kg RPE 6.5 (6.5-7 (105)); Set 3: 1x4 @ 105kg RPE 6.5 (6.5-7 (105)); Set 4: 1x4 @ 105kg RPE 6.5 (6.5-7 (105))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 105,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 105,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 105,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetLoad": 105,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Bulgarian Split Squat",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 30.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Leg Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 30.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Arm Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 20.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 3,
              "targetLoad": 170.0,
              "targetPercent": 72.3,
              "targetRpe": 6.5,
              "notes": "Set 1 - film: 1x3 @ 170kg RPE 6.5 (6.5-7 (170)); Set 2: 1x3 @ 170kg RPE 6.5 (6.5-7 (170)); Set 3: 1x3 @ 170kg RPE 6.5 (6.5-7 (170))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 170,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 170,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 170,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Barbell RDL",
              "orderIndex": 1,
              "targetSets": 2,
              "targetReps": 8,
              "targetLoad": 110.0,
              "targetPercent": 46.8,
              "targetRpe": 7.0,
              "notes": "Set 1 - film: 1x8 @ 110kg RPE 7 (7 (110)); Set 2: 1x8 @ 110kg RPE 7 (7 (110))"
            },
            {
              "exerciseName": "Pause Bench Press",
              "orderIndex": 2,
              "targetSets": 5,
              "targetReps": 2,
              "targetLoad": 110.0,
              "targetPercent": 84.6,
              "targetRpe": 7.0,
              "notes": "Set 1 - film: 1x2 @ 110kg RPE 7 (7 (110)); Set 2: 1x2 @ 110kg RPE 7 (7 (110)); Set 3: 1x2 @ 110kg RPE 7 (7 (110)); Set 4: 1x6 @ 95kg RPE 6.5 (6.5 (95-97.5)); Set 5: 1x6 @ 95kg RPE 6.5 (6.5 (95-97.5))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 2,
                            "targetLoad": 110,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetLoad": 110,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetLoad": 110,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 6,
                            "targetLoad": 95,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 5",
                            "targetReps": 6,
                            "targetLoad": 95,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Dumbbell Row",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Face Pulls",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Lateral Raise",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Hammer Curl",
              "orderIndex": 6,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "3:2:0 Tempo Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 115.0,
              "targetPercent": 67.6,
              "targetRpe": 6.5,
              "notes": "Set 1 - film: 1x3 @ 115kg RPE 6.5 (6.5 (115)); Set 2: 1x3 @ 115kg RPE 6.5 (6.5 (115)); Set 3: 1x3 @ 115kg RPE 6.5 (6.5 (115)); Set 4: 1x3 @ 115kg RPE 6.5 (6.5 (115))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 115,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 115,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 115,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 115,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 102.5,
              "targetPercent": 78.8,
              "targetRpe": 7.5,
              "notes": "Top Set  - film: 1x5 @ 102.5kg RPE 7.5 (7.5 (102.5)); Set 1  - film: 1x5 @ 95kg; Set 2: 1x5 @ 95kg",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 5,
                            "targetLoad": 102.5,
                            "targetRpe": 7.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 95,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 95
                  }
        ]
      
            },
            {
              "exerciseName": "Weighted Dips",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 10.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Pec Fly",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 25.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Stright Bar Tricep Push Down",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 65.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Walking Lunge",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 15.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 180.0,
              "targetPercent": 76.6,
              "targetRpe": 7.5,
              "notes": "Top Set  - film: 1x5 @ 180kg RPE 7.5 (7.5 (180)); Set 1 - film: 1x5 @ 165kg; Set 2: 1x5 @ 165kg",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 5,
                            "targetLoad": 180,
                            "targetRpe": 7.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 165,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 165
                  }
        ]
      
            },
            {
              "exerciseName": "Spoto Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 90.0,
              "targetPercent": 69.2,
              "targetRpe": 7.0,
              "notes": "Set 1 - film: 1x8 @ 90kg RPE 7 (7 (90)); Set 2: 1x8 @ 90kg RPE 7 (7 (90)); Set 2: 1x8 @ 90kg RPE 7 (7 (90))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 8,
                            "targetLoad": 90,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetLoad": 90,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetLoad": 90,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Chest Supported Single Arm Cable Row",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 45.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "T-Bar Row",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 47.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Stright Bar Bicep Curl",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 37.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Hanging Leg Raises",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 10,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 14,
      "phase": "intensification",
      "focus": "Block D Week 3/5",
      "notes": "Imported from Brad workbook sheet D 35 (D 3/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 2,
              "targetLoad": 130.0,
              "targetPercent": 76.5,
              "targetRpe": 7.5,
              "notes": "Top Set -film: 1x2 @ 130kg RPE 7.5 (7.5 (130)); Set 1 - film: 1x2 @ 120kg RPE 6; Set 2: 1x2 @ 120kg RPE 6; Set 3: 1x2 @ 120kg RPE 6; Set 4: 1x2 @ 120kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetLoad": 130,
                            "targetRpe": 7.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 2,
                            "targetLoad": 120,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetLoad": 120,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetLoad": 120,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 2,
                            "targetLoad": 120,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 3,
              "targetLoad": 105.0,
              "targetPercent": 80.8,
              "targetRpe": 7.0,
              "notes": "Set 1 - film: 1x3 @ 105kg RPE 7 (7 (102.5-105)); Set 2: 1x3 @ 105kg RPE 7 (7 (102.5-105)); Set 3: 1x3 @ 102.5kg RPE 7 (7 (102.5-105)); Set 4: 1x3 @ 102.5kg RPE 7 (7 (102.5-105)); Set 5: 1x3 @ 102.5kg RPE 7 (7 (102.5-105))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 105,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 105,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 102.5,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 102.5,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 5",
                            "targetReps": 3,
                            "targetLoad": 102.5,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Leg Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 122.4,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Quad Extension",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 80.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Overhead Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 12.5,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 4,
              "targetLoad": 170.0,
              "targetPercent": 72.3,
              "targetRpe": 6.5,
              "notes": "Set 1 - film: 1x4 @ 170kg RPE 6.5 (6.5 (165-167.5)); Set 2: 1x4 @ 175kg RPE 6.5 (6.5 (165-167.5)); Set 3: 1x4 @ 175kg RPE 6.5 (6.5 (165-167.5)); Set 4: 1x4 @ 175kg RPE 6.5 (6.5 (165-167.5))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 170,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 175,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 175,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetLoad": 175,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 6,
              "targetLoad": 97.5,
              "targetPercent": 57.4,
              "targetRpe": 6.5,
              "notes": "Top Set - film: 1x6 @ 97.5kg RPE 6.5 (6.5 (97.5)); Set 2: 1x6 @ 90kg RPE 5.5; Set 3: 1x6 @ 90kg",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 6,
                            "targetLoad": 97.5,
                            "targetRpe": 6.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 6,
                            "targetLoad": 90,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 6,
                            "targetLoad": 90
                  }
        ]
      
            },
            {
              "exerciseName": "Single Arm Lat Pull Down",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 30.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Seated Cable Row",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 70.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Overhead Press",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 30.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 4,
              "targetLoad": 120.0,
              "targetPercent": 70.6,
              "targetRpe": 6.5,
              "notes": "Set 1 - film: 1x4 @ 120kg RPE 6.5 (6.5 (120)); Set 2: 1x4 @ 120kg RPE 6.5 (6.5 (120)); Set 3: 1x4 @ 120kg RPE 6.5 (6.5 (120)); Set 4: 1x4 @ 120kg RPE 6.5 (6.5 (120))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 120,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 120,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 120,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetLoad": 120,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 2,
              "targetLoad": 107.5,
              "targetPercent": 82.7,
              "targetRpe": 7.5,
              "notes": "Top Set  - film: 1x2 @ 107.5kg RPE 7.5 (7.5 (107.5)); Set 1  - film: 1x4 @ 100kg RPE 6.5 (6.5 (95-100)); Set 2: 1x4 @ 100kg RPE 6.5 (6.5 (95-100)); Set 3: 1x4 @ 100kg RPE 6.5 (6.5 (95-100)); Set 4: 1x4 @ 100kg RPE 6.5 (6.5 (95-100))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetLoad": 107.5,
                            "targetRpe": 7.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 100,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 100,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 100,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetLoad": 100,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Flat Dumbbell Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 40.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Pec Fly",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 10.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Skull Crusher",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 10.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Hip Thurst",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 120.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 2,
              "targetLoad": 190.0,
              "targetPercent": 80.9,
              "targetRpe": 7.5,
              "notes": "Top Set  - film: 1x2 @ 190kg RPE 7.5 (7.5 (185)); Set 1 - film: 1x4 @ 170kg RPE 6.5 (6.5 (165)); Set 2: 1x4 @ 170kg RPE 6.5 (6.5 (165)); Set 3: 1x4 @ 170kg RPE 6.5 (6.5 (165)); Set 4: 1x4 RPE 6.5 (6.5 (165))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetLoad": 190,
                            "targetRpe": 7.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 170,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 170,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 170,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 100.0,
              "targetPercent": 76.9,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x5 @ 100kg RPE 6 (6 (100)); Set 2: 1x5 @ 100kg RPE 6 (6 (100)); Set 2: 1x5 @ 100kg RPE 6 (6 (100))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 100,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 100,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 100,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Barbell Row",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Chin Ups",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Rear Delt Fly",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Decline Bench Sit Ups",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 10,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 15,
      "phase": "intensification",
      "focus": "Block C Week 4/5",
      "notes": "Imported from Brad workbook sheet C 45 (C 4/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 127.5,
              "targetPercent": 75.0,
              "targetRpe": 8.5,
              "notes": "Top Set -film: 1x5 @ 127.5kg RPE 8.5 (8.5 (127.5)); Set 1 - film: 1x6 @ 110kg RPE 7; Set 2: 1x6 @ 110kg RPE 7",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 5,
                            "targetLoad": 127.5,
                            "targetRpe": 8.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 6,
                            "targetLoad": 110,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 6,
                            "targetLoad": 110,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 4,
              "targetLoad": 107.5,
              "targetPercent": 82.7,
              "targetRpe": 7.5,
              "notes": "Set 1 - film: 1x4 @ 107.5kg RPE 7.5 (7.5 (107.5)); Set 2: 1x4 @ 107.5kg RPE 7.5 (7.5 (107.5)); Set 3: 1x4 @ 102.5kg RPE 7.5 (7.5 (107.5)); Set 4: 1x4 @ 102.5kg RPE 7.5 (7.5 (107.5))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 107.5,
                            "targetRpe": 7.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 107.5,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 102.5,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetLoad": 102.5,
                            "targetRpe": 7.5
                  }
        ]
      
            },
            {
              "exerciseName": "Bulgarian Split Squat",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 30.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Leg Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 30.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Arm Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 20.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 3,
              "targetLoad": 177.5,
              "targetPercent": 75.5,
              "targetRpe": 7.5,
              "notes": "Set 1 - film: 1x3 @ 177.5kg RPE 7.5 (7.5 (177.5-180)); Set 2: 1x3 @ 177.5kg RPE 7.5 (7.5 (177.5-180)); Set 3: 1x3 @ 177.5kg RPE 7.5 (7.5 (177.5-180))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 177.5,
                            "targetRpe": 7.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 177.5,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 177.5,
                            "targetRpe": 7.5
                  }
        ]
      
            },
            {
              "exerciseName": "Barbell RDL",
              "orderIndex": 1,
              "targetSets": 2,
              "targetReps": 8,
              "targetLoad": 115.0,
              "targetPercent": 48.9,
              "targetRpe": 8.0,
              "notes": "Set 1 - film: 1x8 @ 115kg RPE 8 (8 (115)); Set 2: 1x8 @ 115kg RPE 8 (8 (115))"
            },
            {
              "exerciseName": "Pause Bench Press",
              "orderIndex": 2,
              "targetSets": 5,
              "targetReps": 2,
              "targetLoad": 112.5,
              "targetPercent": 86.5,
              "targetRpe": 7.5,
              "notes": "Set 1 - film: 1x2 @ 112.5kg RPE 7.5 (7.5 (112.5-115)); Set 2: 1x2 @ 112.5kg RPE 7.5 (7.5 (112.5-115)); Set 3: 1x2 @ 112.5kg RPE 7.5 (7.5 (112.5-115)); Set 4: 1x6 @ 97.5kg RPE 7 (7 (97.5-100)); Set 5: 1x6 @ 97.5kg RPE 7 (7 (97.5-100))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 2,
                            "targetLoad": 112.5,
                            "targetRpe": 7.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetLoad": 112.5,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetLoad": 112.5,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 6,
                            "targetLoad": 97.5,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 5",
                            "targetReps": 6,
                            "targetLoad": 97.5,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Dumbbell Row",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 45.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Face Pulls",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 45.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Lateral Raise",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 25.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Hammer Curl",
              "orderIndex": 6,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 17.5,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "3:2:0 Tempo Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 120.0,
              "targetPercent": 70.6,
              "targetRpe": 7.0,
              "notes": "Set 1 - film: 1x3 @ 120kg RPE 7 (7 (120)); Set 2: 1x3 @ 120kg RPE 7 (7 (120)); Set 3: 1x3 @ 120kg RPE 7 (7 (120)); Set 4: 1x3 @ 120kg RPE 7 (7 (120))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 120,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 120,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 120,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 120,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 102.5,
              "targetPercent": 78.8,
              "targetRpe": 8.5,
              "notes": "Top Set  - film: 1x5 @ 102.5kg RPE 8.5 (8.5 (102.5)); Set 1  - film: 1x5 @ 95kg RPE 7; Set 2: 1x5 @ 95kg RPE 6.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 5,
                            "targetLoad": 102.5,
                            "targetRpe": 8.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 95,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 95,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Weighted Dips",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 10.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Pec Fly",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 25.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Stright Bar Tricep Push Down",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 65.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Walking Lunge",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 15.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 185.0,
              "targetPercent": 78.7,
              "targetRpe": 8.5,
              "notes": "Top Set  - film: 1x5 @ 185kg RPE 8.5 (8.5 (185-187.5)); Set 1 - film: 1x5 @ 165kg RPE 7.5; Set 2: 1x5 @ 165kg RPE 7.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 5,
                            "targetLoad": 185,
                            "targetRpe": 8.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 165,
                            "targetRpe": 7.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 165,
                            "targetRpe": 7.5
                  }
        ]
      
            },
            {
              "exerciseName": "Spoto Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 92.5,
              "targetPercent": 71.2,
              "targetRpe": 7.5,
              "notes": "Set 1 - film: 1x8 @ 92.5kg RPE 7.5 (7.5 (92.5)); Set 2: 1x8 @ 92.5kg RPE 7.5 (7.5 (92.5)); Set 2: 1x8 @ 92.5kg RPE 7.5 (7.5 (92.5))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 8,
                            "targetLoad": 92.5,
                            "targetRpe": 7.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetLoad": 92.5,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetLoad": 92.5,
                            "targetRpe": 7.5
                  }
        ]
      
            },
            {
              "exerciseName": "Chest Supported Single Arm Cable Row",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 45.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "T-Bar Row",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 47.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Stright Bar Bicep Curl",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 37.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Hanging Leg Raises",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 10,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 16,
      "phase": "intensification",
      "focus": "Block C Week 5/5",
      "notes": "Imported from Brad workbook sheet C 55 (C 5/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 132.5,
              "targetPercent": 77.9,
              "targetRpe": 9.5,
              "notes": "Top Set -film: 1x5 @ 132.5kg RPE 9.5 (9.5 (132.5)); Set 1 - film: 1x5 @ 107.5kg RPE 5; Set 2: 1x5 @ 107.5kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 5,
                            "targetLoad": 132.5,
                            "targetRpe": 9.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 107.5,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 107.5,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip Bench",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 4,
              "targetLoad": 102.5,
              "targetPercent": 78.8,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x4 @ 102.5kg RPE 6; Set 2: 1x4 @ 102.5kg RPE 6; Set 3: 1x4 @ 102.5kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 102.5,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 102.5,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 102.5,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Bulgarian Split Squat",
              "orderIndex": 2,
              "targetSets": 2,
              "targetReps": 8,
              "targetLoad": 35.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Leg Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 35.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Arm Tricep Extension",
              "orderIndex": 4,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 25.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Deadlift",
              "orderIndex": 0,
              "targetSets": 2,
              "targetReps": 3,
              "targetLoad": 182.5,
              "targetPercent": 77.7,
              "targetRpe": 8.0,
              "notes": "Set 1 - film: 1x3 @ 182.5kg RPE 8 (8 (182.5)); Set 2: 1x3 @ 182.5kg RPE 8 (8 (182.5))"
            },
            {
              "exerciseName": "Barbell RDL",
              "orderIndex": 1,
              "targetSets": 1,
              "targetReps": 8,
              "targetLoad": 120.0,
              "targetPercent": 51.1,
              "targetRpe": 9.0,
              "notes": "Set 1 - film: 1x8 @ 120kg RPE 9"
            },
            {
              "exerciseName": "Pause Bench Press",
              "orderIndex": 2,
              "targetSets": 4,
              "targetReps": 2,
              "targetLoad": 115.0,
              "targetPercent": 88.5,
              "targetRpe": 8.0,
              "notes": "Set 1 - film: 1x2 @ 115kg RPE 8 (8 (112.5-115)); Set 2: 1x2 @ 112.5kg RPE 8 (8 (112.5-115)); Set 3: 1x6 @ 95kg RPE 6; Set 4: 1x6 @ 95kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 2,
                            "targetLoad": 115,
                            "targetRpe": 8,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetLoad": 112.5,
                            "targetRpe": 8
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 6,
                            "targetLoad": 95,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 6,
                            "targetLoad": 95,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Dumbbell Row",
              "orderIndex": 3,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 45.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Face Pulls",
              "orderIndex": 4,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 45.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Lateral Raise",
              "orderIndex": 5,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 25.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Hammer Curl",
              "orderIndex": 6,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 17.5,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "3:2:0 Tempo Squat",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 3,
              "targetLoad": 120.0,
              "targetPercent": 70.6,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x3 @ 120kg RPE 6; Set 2: 1x3 @ 120kg RPE 6; Set 3: 1x3 @ 120kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 120,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 120,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 120,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 102.5,
              "targetPercent": 78.8,
              "targetRpe": 9.5,
              "notes": "Top Set  - film: 1x5 @ 102.5kg RPE 9.5 (9.5 (102.5)); Set 1  - film: 1x5 @ 95kg RPE 7; Set 2: 1x5 @ 95kg RPE 7",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 5,
                            "targetLoad": 102.5,
                            "targetRpe": 9.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 95,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 95,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Weighted Dips",
              "orderIndex": 2,
              "targetSets": 2,
              "targetReps": 10,
              "targetLoad": 10.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Pec Fly",
              "orderIndex": 3,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 25.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Stright Bar Tricep Push Down",
              "orderIndex": 4,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 65.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Walking Lunge",
              "orderIndex": 5,
              "targetSets": 2,
              "targetReps": 10,
              "targetLoad": 15.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 2,
              "targetReps": 5,
              "targetLoad": 190.0,
              "targetPercent": 80.9,
              "targetRpe": 9.5,
              "notes": "Top Set  - film: 1x5 @ 190kg RPE 9.5 (9.5 (187.5-190)); Set 1 - film: 1x5 @ 170kg RPE 7"
            },
            {
              "exerciseName": "Spoto Press",
              "orderIndex": 1,
              "targetSets": 2,
              "targetReps": 8,
              "targetLoad": 95.0,
              "targetPercent": 73.1,
              "targetRpe": 8.0,
              "notes": "Set 1 - film: 1x8 @ 95kg RPE 8 (8 (92.5-95)); Set 2: 1x8 @ 95kg RPE 8 (8 (92.5-95))"
            },
            {
              "exerciseName": "Chest Supported Single Arm Cable Row",
              "orderIndex": 2,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 45.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "T-Bar Row",
              "orderIndex": 3,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 47.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Stright Bar Bicep Curl",
              "orderIndex": 4,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 37.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Hanging Leg Raises",
              "orderIndex": 5,
              "targetSets": 2,
              "targetReps": 10,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 17,
      "phase": "intensification",
      "focus": "Block D Week 1/5",
      "notes": "Imported from Brad workbook sheet D 15 (D 1/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 2,
              "targetLoad": 115.0,
              "targetPercent": 67.6,
              "targetRpe": 5.5,
              "notes": "Top Set -film: 1x2 @ 115kg RPE 5.5; Set 1 - film: 1x2 @ 105kg RPE 4; Set 2: 1x2 @ 105kg RPE 4; Set 3: 1x2 @ 105kg RPE 4; Set 4: 1x2 @ 105kg RPE 4",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetLoad": 115,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 2,
                            "targetLoad": 105,
                            "targetRpe": 4,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetLoad": 105,
                            "targetRpe": 4
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetLoad": 105,
                            "targetRpe": 4
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 2,
                            "targetLoad": 105,
                            "targetRpe": 4
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 3,
              "targetLoad": 95.0,
              "targetPercent": 73.1,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x3 @ 95kg RPE 6; Set 2: 1x3 @ 95kg RPE 6; Set 3: 1x3 @ 95kg RPE 6; Set 4: 1x3 @ 95kg RPE 6; Set 5: 1x3 @ 95kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 95,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 95,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 95,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 95,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 5",
                            "targetReps": 3,
                            "targetLoad": 95,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Leg Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 122.4,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Quad Extension",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 75.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Overhead Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 12.5,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 4,
              "targetLoad": 150.0,
              "targetPercent": 63.8,
              "targetRpe": 5.5,
              "notes": "Set 1 - film: 1x4 @ 150kg RPE 5.5; Set 2: 1x4 @ 150kg RPE 5.5; Set 3: 1x4 @ 150kg RPE 5.5; Set 4: 1x4 @ 150kg RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 150,
                            "targetRpe": 5.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 150,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 150,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetLoad": 150,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 6,
              "targetLoad": 90.0,
              "targetPercent": 52.9,
              "targetRpe": 5.0,
              "notes": "Top Set - film: 1x6 @ 90kg RPE 5; Set 2: 1x6 @ 85kg RPE 4.5; Set 3: 1x6 @ 85kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 6,
                            "targetLoad": 90,
                            "targetRpe": 5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 6,
                            "targetLoad": 85,
                            "targetRpe": 4.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 6,
                            "targetLoad": 85,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Single Arm Lat Pull Down",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 25.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Seated Cable Row",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 70.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Overhead Press",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 25.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 50.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 4,
              "targetLoad": 110.0,
              "targetPercent": 64.7,
              "targetRpe": 5.5,
              "notes": "Set 1 - film: 1x4 @ 110kg RPE 5.5; Set 2: 1x4 @ 110kg RPE 5.5; Set 3: 1x4 @ 110kg RPE 5.5; Set 4: 1x4 @ 110kg RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 110,
                            "targetRpe": 5.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 110,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 110,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetLoad": 110,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 2,
              "targetLoad": 105.0,
              "targetPercent": 80.8,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x2 @ 105kg RPE 5.5; Set 1  - film: 1x4 @ 95kg RPE 5; Set 2: 1x4 @ 95kg RPE 5; Set 3: 1x4 @ 95kg RPE 5; Set 4: 1x4 @ 95kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetLoad": 105,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 95,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 95,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 95,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetLoad": 95,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Flat Dumbbell Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 37.5,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Pec Fly",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 10.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Skull Crusher",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 10.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Hip Thurst",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 100.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 2,
              "targetLoad": 165.0,
              "targetPercent": 70.2,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x2 @ 165kg RPE 5.5; Set 1 - film: 1x4 @ 140kg RPE 5; Set 2: 1x4 @ 140kg RPE 5; Set 3: 1x4 @ 140kg RPE 5; Set 4: 1x4 @ 140kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetLoad": 165,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 140,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 140,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 140,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetLoad": 140,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 95.0,
              "targetPercent": 73.1,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x5 @ 95kg RPE 5; Set 2: 1x5 @ 95kg RPE 5; Set 2: 1x5 @ 95kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 95,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 95,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 95,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Barbell Row",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Chin Ups",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Rear Delt Fly",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Decline Bench Sit Ups",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 10,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 18,
      "phase": "intensification",
      "focus": "Block D Week 2/5",
      "notes": "Imported from Brad workbook sheet D 25 (D 2/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 2,
              "targetLoad": 120.0,
              "targetPercent": 70.6,
              "targetRpe": 6.5,
              "notes": "Top Set -film: 1x2 @ 120kg RPE 6.5; Set 1 - film: 1x2 @ 110kg RPE 5; Set 2: 1x2 @ 110kg RPE 5; Set 3: 1x2 @ 110kg RPE 5; Set 4: 1x2 @ 110kg",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetLoad": 120,
                            "targetRpe": 6.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 2,
                            "targetLoad": 110,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetLoad": 110,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetLoad": 110,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 2,
                            "targetLoad": 110
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 3,
              "targetLoad": 100.0,
              "targetPercent": 76.9,
              "targetRpe": 6.5,
              "notes": "Set 1 - film: 1x3 @ 100kg RPE 6.5; Set 2: 1x3 @ 100kg RPE 6.5; Set 3: 1x3 @ 100kg RPE 6.5; Set 4: 1x3 @ 100kg RPE 6.5; Set 5: 1x3 RPE 6.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 100,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 100,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 100,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 100,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 5",
                            "targetReps": 3,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Leg Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 122.4,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Quad Extension",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 80.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Overhead Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 12.5,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 4,
              "targetLoad": 165.0,
              "targetPercent": 70.2,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x4 @ 165kg RPE 6; Set 2: 1x4 @ 165kg RPE 6; Set 3: 1x4 @ 165kg RPE 6; Set 4: 1x4 @ 165kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 165,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 165,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 165,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetLoad": 165,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 6,
              "targetLoad": 95.0,
              "targetPercent": 55.9,
              "targetRpe": 6.0,
              "notes": "Top Set - film: 1x6 @ 95kg RPE 6; Set 2: 1x6 @ 90kg RPE 5.5; Set 3: 1x6 @ 90kg",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 6,
                            "targetLoad": 95,
                            "targetRpe": 6,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 6,
                            "targetLoad": 90,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 6,
                            "targetLoad": 90
                  }
        ]
      
            },
            {
              "exerciseName": "Single Arm Lat Pull Down",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 25.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Seated Cable Row",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 70.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Overhead Press",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 30.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 50.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 4,
              "targetLoad": 120.0,
              "targetPercent": 70.6,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x4 @ 120kg RPE 6; Set 2: 1x4 @ 120kg RPE 6; Set 3: 1x4 @ 115kg RPE 6; Set 4: 1x4 @ 115kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 120,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 120,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 115,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetLoad": 115,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 2,
              "targetLoad": 107.5,
              "targetPercent": 82.7,
              "targetRpe": 6.5,
              "notes": "Top Set  - film: 1x2 @ 107.5kg RPE 6.5; Set 1  - film: 1x4 @ 97.5kg RPE 6; Set 2: 1x4 @ 97.5kg RPE 6; Set 3: 1x4 @ 90kg RPE 6; Set 4: 1x4 @ 90kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetLoad": 107.5,
                            "targetRpe": 6.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 97.5,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 97.5,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 90,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetLoad": 90,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Flat Dumbbell Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 37.5,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Pec Fly",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 10.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Skull Crusher",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 10.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Hip Thurst",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 120.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 2,
              "targetLoad": 175.0,
              "targetPercent": 74.5,
              "targetRpe": 6.5,
              "notes": "Top Set  - film: 1x2 @ 175kg RPE 6.5; Set 1 - film: 1x4 @ 160kg RPE 6; Set 2: 1x4 @ 160kg RPE 6; Set 3: 1x4 @ 160kg RPE 6; Set 4: 1x4 @ 160kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetLoad": 175,
                            "targetRpe": 6.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 160,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 160,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 160,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetLoad": 160,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 97.5,
              "targetPercent": 75.0,
              "targetRpe": 5.5,
              "notes": "Set 1 - film: 1x5 @ 97.5kg RPE 5.5; Set 2: 1x5 @ 97.5kg RPE 5.5; Set 2: 1x5 @ 97.5kg RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 97.5,
                            "targetRpe": 5.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 97.5,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 97.5,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Barbell Row",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Chin Ups",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 93.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Rear Delt Fly",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 15.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Decline Bench Sit Ups",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 10,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 19,
      "phase": "intensification",
      "focus": "Block D Week 4/5",
      "notes": "Imported from Brad workbook sheet D 45 (D 4/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 2,
              "targetLoad": 135.0,
              "targetPercent": 79.4,
              "targetRpe": 8.5,
              "notes": "Top Set -film: 1x2 @ 135kg RPE 8.5 (8.5 (135)); Set 1 - film: 1x2 @ 125kg RPE 7.5; Set 2: 1x2 @ 125kg RPE 7; Set 3: 1x2 @ 125kg RPE 7.5; Set 4: 1x2 @ 125kg RPE 7",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetLoad": 135,
                            "targetRpe": 8.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 2,
                            "targetLoad": 125,
                            "targetRpe": 7.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetLoad": 125,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetLoad": 125,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 2,
                            "targetLoad": 125,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 3,
              "targetLoad": 107.5,
              "targetPercent": 82.7,
              "targetRpe": 7.5,
              "notes": "Set 1 - film: 1x3 @ 107.5kg RPE 7.5; Set 2: 1x3 @ 107.5kg RPE 7.5; Set 3: 1x3 @ 107.5kg RPE 7.5; Set 4: 1x3 @ 102.5kg RPE 7.5; Set 5: 1x3 RPE 7.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 107.5,
                            "targetRpe": 7.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 107.5,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 107.5,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 102.5,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 5",
                            "targetReps": 3,
                            "targetRpe": 7.5
                  }
        ]
      
            },
            {
              "exerciseName": "Leg Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 150.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Quad Extension",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 80.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Overhead Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 12.5,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 4,
              "targetLoad": 182.5,
              "targetPercent": 77.7,
              "targetRpe": 7.0,
              "notes": "Set 1 - film: 1x4 @ 182.5kg RPE 7; Set 2: 1x4 @ 182.5kg RPE 7; Set 3: 1x4 @ 182.5kg RPE 7",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 182.5,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 182.5,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 182.5,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 6,
              "targetLoad": 100.0,
              "targetPercent": 58.8,
              "targetRpe": 7.0,
              "notes": "Top Set - film: 1x6 @ 100kg RPE 7; Set 2: 1x6 @ 92.5kg RPE 6; Set 3: 1x6 @ 92.5kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 6,
                            "targetLoad": 100,
                            "targetRpe": 7,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 6,
                            "targetLoad": 92.5,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 6,
                            "targetLoad": 92.5,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Single Arm Lat Pull Down",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 27.5,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Seated Cable Row",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 75.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Overhead Press",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 32.5,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 55.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 4,
              "targetLoad": 125.0,
              "targetPercent": 73.5,
              "targetRpe": 7.0,
              "notes": "Set 1 - film: 1x4 @ 125kg RPE 7; Set 2: 1x4 @ 125kg RPE 7; Set 3: 1x4 @ 125kg RPE 7",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 125,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 125,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 125,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 2,
              "targetLoad": 112.5,
              "targetPercent": 86.5,
              "targetRpe": 8.5,
              "notes": "Top Set  - film: 1x2 @ 112.5kg RPE 8.5; Set 1  - film: 1x4 @ 102.5kg RPE 7; Set 2: 1x4 @ 102.5kg RPE 7; Set 3: 1x4 @ 102.5kg RPE 7",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetLoad": 112.5,
                            "targetRpe": 8.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 102.5,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 102.5,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 102.5,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Flat Dumbbell Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 40.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Pec Fly",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 10.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Skull Crusher",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 10.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Hip Thurst",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 10,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 2,
              "targetLoad": 205.0,
              "targetPercent": 87.2,
              "targetRpe": 8.5,
              "notes": "Top Set  - film: 1x2 @ 205kg RPE 8.5; Set 1 - film: 1x4 @ 180kg RPE 7; Set 2: 1x4 @ 180kg RPE 7; Set 3: 1x4 @ 180kg RPE 7",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetLoad": 205,
                            "targetRpe": 8.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 180,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 180,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 180,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 102.5,
              "targetPercent": 78.8,
              "targetRpe": 6.5,
              "notes": "Set 1 - film: 1x5 @ 102.5kg RPE 6.5; Set 2: 1x5 @ 102.5kg RPE 6.5; Set 2: 1x5 @ 102.5kg RPE 6.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 102.5,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 102.5,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 102.5,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Barbell Row",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 100.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Chin Ups",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 93.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Rear Delt Fly",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 15.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Decline Bench Sit Ups",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 10,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 20,
      "phase": "intensification",
      "focus": "Block D Week 5/5",
      "notes": "Imported from Brad workbook sheet D 55 (D 5/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 2,
              "targetLoad": 140.0,
              "targetPercent": 82.4,
              "targetRpe": 9.5,
              "notes": "Top Set -film: 1x2 @ 140kg RPE 9.5 (9.5 (140)); Set 1 - film: 1x2 @ 127.5kg RPE 8; Set 2: 1x2 @ 127.5kg RPE 8; Set 3: 1x2 @ 127.5kg RPE 7.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetLoad": 140,
                            "targetRpe": 9.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 2,
                            "targetLoad": 127.5,
                            "targetRpe": 8,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetLoad": 127.5,
                            "targetRpe": 8
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetLoad": 127.5,
                            "targetRpe": 7.5
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 110.0,
              "targetPercent": 84.6,
              "targetRpe": 8.0,
              "notes": "Set 1 - film: 1x3 @ 110kg RPE 8 (8 (110)); Set 2: 1x3 @ 110kg RPE 8 (8 (110)); Set 3: 1x3 @ 110kg RPE 8 (8 (110)); Set 4: 1x3 @ 110kg RPE 8 (8 (110))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 110,
                            "targetRpe": 8,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 110,
                            "targetRpe": 8
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 110,
                            "targetRpe": 8
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 110,
                            "targetRpe": 8
                  }
        ]
      
            },
            {
              "exerciseName": "Leg Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 150.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Quad Extension",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 80.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Overhead Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 12.5,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 2,
              "targetReps": 4,
              "targetLoad": 187.5,
              "targetPercent": 79.8,
              "targetRpe": 7.5,
              "notes": "Set 1 - film: 1x4 @ 187.5kg RPE 7.5 (7.5 (187.5)); Set 2: 1x4 @ 187.5kg RPE 7.5 (7.5 (187.5))"
            },
            {
              "exerciseName": "Pause Bench Press",
              "orderIndex": 1,
              "targetSets": 2,
              "targetReps": 6,
              "targetLoad": 102.5,
              "targetPercent": 60.3,
              "targetRpe": 8.0,
              "notes": "Top Set - film: 1x6 @ 102.5kg RPE 8 (8 (102.5)); Set 2: 1x6 @ 95kg RPE 6"
            },
            {
              "exerciseName": "Single Arm Lat Pull Down",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 35.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Seated Cable Row",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 75.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Overhead Press",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 30.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 2,
              "targetReps": 4,
              "targetLoad": 127.5,
              "targetPercent": 75.0,
              "targetRpe": 7.5,
              "notes": "Set 1 - film: 1x4 @ 127.5kg RPE 7.5 (7.5 (127.5)); Set 2: 1x4 @ 127.5kg RPE 7.5 (7.5 (127.5))"
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 2,
              "targetLoad": 117.5,
              "targetPercent": 90.4,
              "targetRpe": 9.5,
              "notes": "Top Set  - film: 1x2 @ 117.5kg RPE 9.5 (9.5 (115)); Set 1  - film: 1x4 @ 107.5kg RPE 8 (8 (105)); Set 2: 1x4 @ 107.5kg RPE 8 (8 (105)); Set 3: 1x4 RPE 8 (8 (105))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetLoad": 117.5,
                            "targetRpe": 9.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 107.5,
                            "targetRpe": 8,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 107.5,
                            "targetRpe": 8
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetRpe": 8
                  }
        ]
      
            },
            {
              "exerciseName": "Flat Dumbbell Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 40.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Pec Fly",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 10.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Skull Crusher",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 10.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Hip Thurst",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 120.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 2,
              "targetLoad": 210.0,
              "targetPercent": 89.4,
              "targetRpe": 9.5,
              "notes": "Top Set  - film: 1x2 @ 210kg RPE 9.5 (9.5 (210-215)); Set 1 - film: 1x4 @ 185kg RPE 7.5 (7.5 (185)); Set 2: 1x4 @ 185kg RPE 7.5 (7.5 (185))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetLoad": 210,
                            "targetRpe": 9.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 185,
                            "targetRpe": 7.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 185,
                            "targetRpe": 7.5
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 105.0,
              "targetPercent": 80.8,
              "targetRpe": 7.0,
              "notes": "Set 1 - film: 1x5 @ 105kg RPE 7 (7 (105)); Set 2: 1x5 @ 105kg RPE 7 (7 (105)); Set 2: 1x5 RPE 7 (7 (105))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 105,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 105,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Barbell Row",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Chin Ups",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Rear Delt Fly",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Decline Bench Sit Ups",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 10,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 21,
      "phase": "intensification",
      "focus": "Block E Week 1/5",
      "notes": "Imported from Brad workbook sheet E 15 (E 1/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 1,
              "targetLoad": 120.0,
              "targetPercent": 70.6,
              "targetRpe": 5.5,
              "notes": "Top Set -film: 1x1 @ 120kg RPE 5.5; Set 1 - film: 1x3 @ 105kg RPE 5; Set 2: 1x3 @ 105kg RPE 5; Set 3: 1x3 @ 105kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 120,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 105,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 105,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 105,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "2 Second Pause Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 2,
              "targetLoad": 102.5,
              "targetPercent": 78.8,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x2 @ 102.5kg RPE 6; Set 2: 1x2 @ 102.5kg RPE 6; Set 3: 1x2 @ 102.5kg RPE 6; Set 4: 1x2 @ 102.5kg RPE 6; Set 5: 1x2 @ 102.5kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 2,
                            "targetLoad": 102.5,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetLoad": 102.5,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetLoad": 102.5,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 2,
                            "targetLoad": 102.5,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 5",
                            "targetReps": 2,
                            "targetLoad": 102.5,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Front Foot Elevated Split Squat",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 30.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Leg Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 40.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 12.5,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 160.0,
              "targetPercent": 68.1,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x5 @ 160kg RPE 5; Set 2: 1x5 @ 160kg RPE 5; Set 3: 1x5 @ 160kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 160,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 160,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 160,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Lasrsen Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 90.0,
              "targetPercent": 52.9,
              "targetRpe": 5.0,
              "notes": "Top Set - film: 1x5 @ 90kg RPE 5; Set 2: 1x5 @ 90kg RPE 5; Set 3: 1x5 @ 90kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 5,
                            "targetLoad": 90,
                            "targetRpe": 5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 90,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 90,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Single Dumbbell Row",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 50.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Wide Grip Cable Row",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 75.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Rear Delt Fly",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "DUmbbell Bicep Curl",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 105.0,
              "targetPercent": 61.8,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x5 @ 105kg RPE 5; Set 2: 1x5 @ 105kg RPE 5; Set 3: 1x5 @ 105kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 105,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 105,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 105,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 1,
              "targetLoad": 107.5,
              "targetPercent": 82.7,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x1 @ 107.5kg RPE 5.5; Set 1  - film: 1x3 @ 100kg RPE 5; Set 2: 1x3 @ 100kg RPE 5; Set 3: 1x3 @ 100kg RPE 5; Set 4: 1x3 @ 100kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 107.5,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 100,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 100,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 100,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 100,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Flat Dumbbell Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 40.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Pec Fly",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 25.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Lateral Raise",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 25.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Tricep Push Down",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 65.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 1,
              "targetLoad": 180.0,
              "targetPercent": 76.6,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x1 @ 180kg RPE 5.5; Set 1 - film: 1x3 @ 165kg RPE 5; Set 2: 1x3 @ 165kg RPE 5; Set 3: 1x3 @ 165kg RPE 5; Set 4: 1x3 @ 165kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 180,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 165,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 165,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 165,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 165,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 90.0,
              "targetPercent": 69.2,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x8 @ 90kg RPE 5; Set 2: 1x8 @ 90kg RPE 5; Set 2: 1x8 @ 90kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 8,
                            "targetLoad": 90,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetLoad": 90,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetLoad": 90,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Dumbbell RDL",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 35.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Pull Ups",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetLoad": 10.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Straight Bar Bicep Curl",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 35.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "AB Leg Raises",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 10,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 22,
      "phase": "intensification",
      "focus": "Block E Week 2/5",
      "notes": "Imported from Brad workbook sheet E 25 (E 2/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 1,
              "targetLoad": 130.0,
              "targetPercent": 76.5,
              "targetRpe": 6.5,
              "notes": "Top Set -film: 1x1 @ 130kg RPE 6.5; Set 1 - film: 1x3 @ 115kg RPE 6; Set 2: 1x3 @ 115kg RPE 6; Set 3: 1x3 @ 115kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 130,
                            "targetRpe": 6.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 115,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 115,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 115,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "2 Second Pause Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 2,
              "targetLoad": 105.0,
              "targetPercent": 80.8,
              "targetRpe": 6.5,
              "notes": "Set 1 - film: 1x2 @ 105kg RPE 6.5; Set 2: 1x2 @ 105kg RPE 6.5; Set 3: 1x2 @ 105kg RPE 6.5; Set 4: 1x2 @ 105kg RPE 6.5; Set 5: 1x2 @ 105kg RPE 6.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 2,
                            "targetLoad": 105,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetLoad": 105,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetLoad": 105,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 2,
                            "targetLoad": 105,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 5",
                            "targetReps": 2,
                            "targetLoad": 105,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Front Foot Elevated Split Squat",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 30.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Leg Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 40.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 12.5,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 170.0,
              "targetPercent": 72.3,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x5 @ 170kg RPE 6; Set 2: 1x5 @ 170kg RPE 6; Set 3: 1x5 @ 170kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 170,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 170,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 170,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Larsen Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 95.0,
              "targetPercent": 55.9,
              "targetRpe": 6.0,
              "notes": "Top Set - film: 1x5 @ 95kg RPE 6; Set 2: 1x5 @ 95kg RPE 6; Set 3: 1x5 @ 95kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 5,
                            "targetLoad": 95,
                            "targetRpe": 6,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 95,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 95,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Single Dumbbell Row",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 50.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Wide Grip Cable Row",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 75.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Rear Delt Fly",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 10.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "DUmbbell Bicep Curl",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 17.5,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 115.0,
              "targetPercent": 67.6,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x5 @ 115kg RPE 6; Set 2: 1x5 @ 117.5kg RPE 6; Set 3: 1x5 @ 117.5kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 115,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 117.5,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 117.5,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 1,
              "targetLoad": 112.5,
              "targetPercent": 86.5,
              "targetRpe": 6.5,
              "notes": "Top Set  - film: 1x1 @ 112.5kg RPE 6.5; Set 1  - film: 1x3 @ 102.5kg RPE 6; Set 2: 1x3 @ 102.5kg RPE 6; Set 3: 1x3 @ 102.5kg RPE 6; Set 4: 1x3 @ 102.5kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 112.5,
                            "targetRpe": 6.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 102.5,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 102.5,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 102.5,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 102.5,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Flat Dumbbell Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 40.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Pec Fly",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Lateral Raise",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Tricep Push Down",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 65.0,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 1,
              "targetLoad": 190.0,
              "targetPercent": 80.9,
              "targetRpe": 6.5,
              "notes": "Top Set  - film: 1x1 @ 190kg RPE 6.5; Set 1 - film: 1x3 @ 175kg RPE 6; Set 2: 1x3 @ 175kg RPE 6; Set 3: 1x3 @ 176kg RPE 6; Set 4: 1x3 @ 175kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 190,
                            "targetRpe": 6.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 175,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 175,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 176,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 175,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 92.5,
              "targetPercent": 71.2,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x8 @ 92.5kg RPE 6; Set 2: 1x8 @ 92.5kg RPE 6; Set 2: 1x8 @ 92.5kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 8,
                            "targetLoad": 92.5,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetLoad": 92.5,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetLoad": 92.5,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Dumbbell RDL",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Pull Ups",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Straight Bar Bicep Curl",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "AB Leg Raises",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 10,
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 23,
      "phase": "intensification",
      "focus": "Block E Week 3/5",
      "notes": "Imported from Brad workbook sheet E 35 (E 3/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 1,
              "targetLoad": 140.0,
              "targetPercent": 82.4,
              "targetRpe": 7.5,
              "notes": "Top Set -film: 1x1 @ 140kg RPE 7.5; Set 1 - film: 1x3 @ 125kg RPE 7; Set 2: 1x3 @ 125kg RPE 7; Set 3: 1x3 @ 125kg RPE 7",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 140,
                            "targetRpe": 7.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 125,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 125,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 125,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "2 Second Pause Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 2,
              "targetLoad": 107.5,
              "targetPercent": 82.7,
              "targetRpe": 7.0,
              "notes": "Set 1 - film: 1x2 @ 107.5kg RPE 7; Set 2: 1x2 @ 107.5kg RPE 7; Set 3: 1x2 @ 107.5kg RPE 7; Set 4: 1x2 RPE 7; Set 5: 1x2 RPE 7",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 2,
                            "targetLoad": 107.5,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetLoad": 107.5,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetLoad": 107.5,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 2,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 5",
                            "targetReps": 2,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Front Foot Elevated Split Squat",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Leg Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 180.0,
              "targetPercent": 76.6,
              "targetRpe": 6.5,
              "notes": "Set 1 - film: 1x5 @ 180kg RPE 6.5; Set 2: 1x5 @ 180kg RPE 6.5; Set 3: 1x5 @ 180kg RPE 6.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 180,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 180,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 180,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Lasrsen Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 97.5,
              "targetPercent": 57.4,
              "targetRpe": 6.5,
              "notes": "Top Set - film: 1x5 @ 97.5kg RPE 6.5; Set 2: 1x5 @ 100kg RPE 6.5; Set 3: 1x5 @ 100kg RPE 6.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 5,
                            "targetLoad": 97.5,
                            "targetRpe": 6.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 100,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 100,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Single Dumbbell Row",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 50.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Wide Grip Cable Row",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 80.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Rear Delt Fly",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 10.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "DUmbbell Bicep Curl",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 17.5,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 125.0,
              "targetPercent": 73.5,
              "targetRpe": 6.5,
              "notes": "Set 1 - film: 1x5 @ 125kg RPE 6.5; Set 2: 1x5 @ 125kg RPE 6.5; Set 3: 1x5 @ 125kg RPE 6.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 125,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 125,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 125,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 1,
              "targetLoad": 117.5,
              "targetPercent": 90.4,
              "targetRpe": 7.5,
              "notes": "Top Set  - film: 1x1 @ 117.5kg RPE 7.5; Set 1  - film: 1x3 @ 107.5kg RPE 7; Set 2: 1x3 @ 107.5kg RPE 7; Set 3: 1x3 @ 107.5kg RPE 7; Set 4: 1x3 RPE 7",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 117.5,
                            "targetRpe": 7.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 107.5,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 107.5,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 107.5,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Flat Dumbbell Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 40.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Pec Fly",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Lateral Raise",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Tricep Push Down",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 70.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 1,
              "targetLoad": 200.0,
              "targetPercent": 85.1,
              "targetRpe": 7.5,
              "notes": "Top Set  - film: 1x1 @ 200kg RPE 7.5; Set 1 - film: 1x3 @ 180kg RPE 6.5; Set 2: 1x3 @ 180kg RPE 6.5; Set 3: 1x3 @ 180kg RPE 6.5; Set 4: 1x3 @ 180kg RPE 6.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 200,
                            "targetRpe": 7.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 180,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 180,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 180,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 180,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 95.0,
              "targetPercent": 73.1,
              "targetRpe": 6.5,
              "notes": "Set 1 - film: 1x8 @ 95kg RPE 6.5; Set 2: 1x8 @ 95kg RPE 6.5; Set 2: 1x8 @ 95kg RPE 6.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 8,
                            "targetLoad": 95,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetLoad": 95,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetLoad": 95,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Dumbbell RDL",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Pull Ups",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Straight Bar Bicep Curl",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "AB Leg Raises",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 10,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 24,
      "phase": "intensification",
      "focus": "Block E Week 4/5",
      "notes": "Imported from Brad workbook sheet E 45 (E 4/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 1,
              "targetLoad": 145.0,
              "targetPercent": 85.3,
              "targetRpe": 8.5,
              "notes": "Top Set -film: 1x1 @ 145kg RPE 8.5 (8.5 (145)); Set 1 - film: 1x3 @ 130kg RPE 7.5 (7.5 (127.5-130)); Set 2: 1x3 @ 130kg RPE 7.5 (7.5 (127.5-130)); Set 3: 1x3 @ 130kg RPE 7.5 (7.5 (127.5-130))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 145,
                            "targetRpe": 8.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 130,
                            "targetRpe": 7.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 130,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 130,
                            "targetRpe": 7.5
                  }
        ]
      
            },
            {
              "exerciseName": "2 Second Pause Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 2,
              "targetLoad": 110.0,
              "targetPercent": 84.6,
              "targetRpe": 7.5,
              "notes": "Set 1 - film: 1x2 @ 110kg RPE 7.5; Set 2: 1x2 @ 110kg RPE 7.5; Set 3: 1x2 @ 110kg RPE 7.5; Set 4: 1x2 @ 110kg RPE 7.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 2,
                            "targetLoad": 110,
                            "targetRpe": 7.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetLoad": 110,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetLoad": 110,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 2,
                            "targetLoad": 110,
                            "targetRpe": 7.5
                  }
        ]
      
            },
            {
              "exerciseName": "Front Foot Elevated Split Squat",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Leg Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 2,
              "targetReps": 5,
              "targetLoad": 185.0,
              "targetPercent": 78.7,
              "targetRpe": 7.0,
              "notes": "Set 1 - film: 1x5 @ 185kg RPE 7 (7 (185)); Set 2: 1x5 @ 185kg RPE 7 (7 (185))"
            },
            {
              "exerciseName": "Lasrsen Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 105.0,
              "targetPercent": 61.8,
              "targetRpe": 7.0,
              "notes": "Top Set - film: 1x5 @ 105kg RPE 7 (7 (105)); Set 2: 1x5 @ 105kg RPE 7 (7 (105)); Set 3: 1x5 @ 105kg RPE 7 (7 (105))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 5,
                            "targetLoad": 105,
                            "targetRpe": 7,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 105,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 105,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Single Dumbbell Row",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 50.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Wide Grip Cable Row",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 80.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Rear Delt Fly",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 12.5,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "DUmbbell Bicep Curl",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 17.5,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 130.0,
              "targetPercent": 76.5,
              "targetRpe": 7.0,
              "notes": "Set 1 - film: 1x5 @ 130kg RPE 7 (7 (127.5-130)); Set 2: 1x5 @ 130kg RPE 7 (7 (127.5-130)); Set 3: 1x5 @ 130kg RPE 7 (7 (127.5-130))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 130,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 130,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 130,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 1,
              "targetLoad": 122.5,
              "targetPercent": 94.2,
              "targetRpe": 8.5,
              "notes": "Top Set  - film: 1x1 @ 122.5kg RPE 8.5 (8.5 (122.5)); Set 1  - film: 1x3 @ 110kg RPE 7.5 (7.5 (110-112.5)); Set 2: 1x3 @ 110kg RPE 7.5 (7.5 (110-112.5)); Set 3: 1x3 @ 110kg RPE 7.5 (7.5 (110-112.5)); Set 4: 1x3 RPE 7.5 (7.5 (110-112.5))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 122.5,
                            "targetRpe": 8.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 110,
                            "targetRpe": 7.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 110,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 110,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetRpe": 7.5
                  }
        ]
      
            },
            {
              "exerciseName": "Flat Dumbbell Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 40.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Pec Fly",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Lateral Raise",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Tricep Push Down",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 1,
              "targetLoad": 215.0,
              "targetPercent": 91.5,
              "targetRpe": 8.5,
              "notes": "Top Set  - film: 1x1 @ 215kg RPE 8.5 (8.5 (210-215)); Set 1 - film: 1x3 @ 185kg RPE 7 (7 (185)); Set 2: 1x3 @ 185kg RPE 7 (7 (185)); Set 3: 1x3 @ 185kg RPE 7 (7 (185))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 215,
                            "targetRpe": 8.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 185,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 185,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 185,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 100.0,
              "targetPercent": 76.9,
              "targetRpe": 7.0,
              "notes": "Set 1 - film: 1x8 @ 100kg RPE 7 (7 (100)); Set 2: 1x8 @ 100kg RPE 7 (7 (100)); Set 2: 1x8 @ 100kg RPE 7 (7 (100))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 8,
                            "targetLoad": 100,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetLoad": 100,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetLoad": 100,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Dumbbell RDL",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 40.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Pull Ups",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Straight Bar Bicep Curl",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12,
              "targetLoad": 35.0,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "AB Leg Raises",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 10,
              "targetRpe": 8.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 25,
      "phase": "intensification",
      "focus": "Block E Week 5/5",
      "notes": "Imported from Brad workbook sheet E 55 (E 5/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 1,
              "targetLoad": 155.0,
              "targetPercent": 91.2,
              "targetRpe": 9.5,
              "notes": "Top Set -film: 1x1 @ 155kg RPE 9.5 (9.5 (150)); Set 1 - film: 1x3 @ 120kg RPE 6; Set 2: 1x3 @ 120kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 155,
                            "targetRpe": 9.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 120,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 120,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "2 Second Pause Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 2,
              "targetLoad": 112.5,
              "targetPercent": 86.5,
              "targetRpe": 8.0,
              "notes": "Set 1 - film: 1x2 @ 112.5kg RPE 8 (8 (112.5-115)); Set 2: 1x2 @ 112.5kg RPE 8 (8 (112.5-115)); Set 3: 1x2 @ 112.5kg RPE 8 (8 (112.5-115)); Set 4: 1x2 @ 112.5kg RPE 8 (8 (112.5-115))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 2,
                            "targetLoad": 112.5,
                            "targetRpe": 8,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetLoad": 112.5,
                            "targetRpe": 8
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetLoad": 112.5,
                            "targetRpe": 8
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 2,
                            "targetLoad": 112.5,
                            "targetRpe": 8
                  }
        ]
      
            },
            {
              "exerciseName": "Front Foot Elevated Split Squat",
              "orderIndex": 2,
              "targetSets": 2,
              "targetReps": 10,
              "targetLoad": 35.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Leg Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 45.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Tricep Extension",
              "orderIndex": 4,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 12.5,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 2,
              "targetReps": 5,
              "targetLoad": 190.0,
              "targetPercent": 80.9,
              "targetRpe": 7.5,
              "notes": "Set 1 - film: 1x5 @ 190kg RPE 7.5 (7.5 (190)); Set 2: 1x5 @ 190kg RPE 7.5 (7.5 (190))"
            },
            {
              "exerciseName": "Lasrsen Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 107.5,
              "targetPercent": 63.2,
              "targetRpe": 7.5,
              "notes": "Top Set - film: 1x5 @ 107.5kg RPE 7.5 (7.5 (107.5)); Set 2: 1x5 @ 107.5kg RPE 7.5 (7.5 (107.5)); Set 3: 1x5 @ 107.5kg RPE 7.5 (7.5 (107.5))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 5,
                            "targetLoad": 107.5,
                            "targetRpe": 7.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 107.5,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 107.5,
                            "targetRpe": 7.5
                  }
        ]
      
            },
            {
              "exerciseName": "Single Dumbbell Row",
              "orderIndex": 2,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 50.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Wide Grip Cable Row",
              "orderIndex": 3,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 80.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Rear Delt Fly",
              "orderIndex": 4,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 12.5,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "DUmbbell Bicep Curl",
              "orderIndex": 5,
              "targetSets": 2,
              "targetReps": 12,
              "targetLoad": 17.5,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 2,
              "targetReps": 5,
              "targetLoad": 120.0,
              "targetPercent": 70.6,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x5 @ 120kg RPE 6; Set 2: 1x5 @ 120kg RPE 6"
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 1,
              "targetLoad": 127.5,
              "targetPercent": 98.1,
              "targetRpe": 9.5,
              "notes": "Top Set  - film: 1x1 @ 127.5kg RPE 9.5 (9.5 (125)); Set 1  - film: 1x3 @ 112.5kg RPE 8 (8 (112.5)); Set 2: 1x3 @ 112.5kg RPE 8 (8 (112.5)); Set 3: 1x3 RPE 8 (8 (112.5))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 127.5,
                            "targetRpe": 9.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 112.5,
                            "targetRpe": 8,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 112.5,
                            "targetRpe": 8
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetRpe": 8
                  }
        ]
      
            },
            {
              "exerciseName": "Flat Dumbbell Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10,
              "targetLoad": 45.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Pec Fly",
              "orderIndex": 3,
              "targetSets": 2,
              "targetReps": 12,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Lateral Raise",
              "orderIndex": 4,
              "targetSets": 2,
              "targetReps": 12,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Tricep Push Down",
              "orderIndex": 5,
              "targetSets": 2,
              "targetReps": 12,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 1,
              "targetLoad": 235.0,
              "targetPercent": 100.0,
              "targetRpe": 9.5,
              "notes": "Top Set  - film: 1x1 @ 235kg RPE 9.5 (9.5 (225-227.5)); Set 1 - film: 1x3 @ 175kg RPE 6; Set 2: 1x3 @ 170kg RPE 6; Set 3: 1x3 @ 170kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 1,
                            "targetLoad": 235,
                            "targetRpe": 9.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 175,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 170,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 170,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench Press",
              "orderIndex": 1,
              "targetSets": 2,
              "targetReps": 8,
              "targetLoad": 102.5,
              "targetPercent": 78.8,
              "targetRpe": 7.5,
              "notes": "Set 1 - film: 1x8 @ 102.5kg RPE 7.5 (7.5 (102.5)); Set 2: 1x8 @ 102.5kg RPE 7.5 (7.5 (102.5))"
            },
            {
              "exerciseName": "Dumbbell RDL",
              "orderIndex": 2,
              "targetSets": 2,
              "targetReps": 10,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Pull Ups",
              "orderIndex": 3,
              "targetSets": 2,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Straight Bar Bicep Curl",
              "orderIndex": 4,
              "targetSets": 2,
              "targetReps": 12,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "AB Leg Raises",
              "orderIndex": 5,
              "targetSets": 2,
              "targetReps": 10,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 26,
      "phase": "intensification",
      "focus": "Block F Week 1/5",
      "notes": "Imported from Brad workbook sheet F 15 (F 1/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 4,
              "targetPercent": 0.0,
              "targetRpe": 5.0,
              "notes": "Top Set -film: 1x4 RPE 5; Set 1 - film: 1x4 @ -7.5kg; Set 2: 1x4 @ -7.5kg; Set 3: 1x4 @ -7.5kg",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 4,
                            "targetRpe": 5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip Bench",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 6,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Set 1 - film: 1x6 RPE 5.5; Set 2: 1x6 RPE 5.5; Set 3: 1x6 RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 6,
                            "targetRpe": 5.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 6,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 6,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Bulgarian Split Squat",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Hip Thrust - Barbell Or Machine",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Adductor Machine",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Overhead Tricep Extension",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 8,
              "targetPercent": 0.0,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x8 RPE 5; Set 2: 1x8 RPE 5; Set 3: 1x8 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 8,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 8,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Touch and Go Bench",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 10,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set - film: 1x10 RPE 5.5; Set 2: 1x10 @ -5kg; Set 3: 1x10 @ -5kg",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 10,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 10
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 10
                  }
        ]
      
            },
            {
              "exerciseName": "Lat Pull Down",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Chest Supported Cable Row",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Rear Delt Fly",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 8,
              "targetPercent": 0.0,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x8 RPE 5; Set 2: 1x8 RPE 5; Set 3: 1x8 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 8,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 8,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 4,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x4 RPE 5.5; Set 1  - film: 1x4 @ -5kg; Set 2: 1x4 @ -5kg; Set 3: 1x4 @ -5kg; Set 4: 1x4 @ -5kg",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 4,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4
                  }
        ]
      
            },
            {
              "exerciseName": "Single Leg Quad Extensions",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Incline Dumbbell Press",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Pec Fly",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Arm Tricep Extension",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Deadlift",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 4,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x4 RPE 5.5; Set 1 - film: 1x4 @ -10kg; Set 2: 1x4 @ -10kg; Set 3: 1x4 @ -10kg",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 4,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Spoto Press",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 5,
              "targetPercent": 0.0,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x5 RPE 5; Set 2: 1x5 RPE 5; Set 3: 1x5 RPE 5; Set 4: 1x5 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 5,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Barbell Row",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Lateral Raise + Front Raise Super Set",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Hammer Curl",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set -film: 1x3 RPE 5.5; Set 1 - film: 1x5 RPE 5; Set 2: 1x5 RPE 5; Set 3: 1x5 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 5,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Set 1 - film: 1x5 RPE 5.5; Set 2: 1x5 RPE 5.5; Set 3: 1x5 RPE 5.5; Set 4: 1x5 RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetRpe": 5.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 5,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Leg Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Adductor Machine",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Arm Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetPercent": 0.0,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x5 RPE 5; Set 2: 1x5 RPE 5; Set 3: 1x5 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "2 Second Pause Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 2,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set - film: 1x2 RPE 5.5; Set 2: 1x2 RPE 5.5; Set 3: 1x2 RPE 5.5; Set 4: 1x2 RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 2,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Flat Dumbbell Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 8,
              "targetRpe": 6.0,
              "notes": "Top Set - film: 1x8 RPE 6; Set 2: 1x8 RPE 6; Set 3: 1x8 RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 8,
                            "targetRpe": 6,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 8,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Single Leg Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Dumbbell Row",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Machine Upper Back Row",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 6,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x3 RPE 5; Set 2: 1x3 RPE 5; Set 3: 1x3 RPE 5; Set 4: 1x3 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x3 RPE 5.5; Set 1  - film: 1x4 RPE 5; Set 2: 1x4 RPE 5; Set 3: 1x4 RPE 5; Set 4: 1x4 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Walking Lunge",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Overhead Press",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Lateral Raise",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Tricep Skull Crushers",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Deadlift",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x3 RPE 5.5; Set 1 - film: 1x4 RPE 5; Set 2: 1x4 RPE 5; Set 3: 1x4 RPE 5; Set 4: 1x4 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip Larsen Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 6,
              "targetPercent": 0.0,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x6 RPE 5; Set 2: 1x6 RPE 5; Set 3: 1x6 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 6,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 6,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 6,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Upper Back Cable Row",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Lat Pull Down",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 27,
      "phase": "intensification",
      "focus": "Block G Week 1/5",
      "notes": "Imported from Brad workbook sheet G 15 (G 1/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 120.0,
              "targetPercent": 70.6,
              "targetRpe": 5.5,
              "notes": "Top Set -film: 1x3 @ 120kg RPE 5.5; Set 1 - film: 1x4 @ 115kg RPE 5; Set 2: 1x4 @ 115kg RPE 5; Set 3 (I will added one set next week): 1x4 @ 115kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetLoad": 120,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 115,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 115,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 5,
              "targetLoad": 100.0,
              "targetPercent": 76.9,
              "targetRpe": 5.5,
              "notes": "Set 1 - film: 1x5 @ 100kg RPE 5.5; Set 2: 1x5 @ 100kg RPE 5.5; Set 3: 1x5 @ 100kg RPE 5.5; Set 4: 1x5 @ 95kg RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 100,
                            "targetRpe": 5.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 100,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 100,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 5,
                            "targetLoad": 95,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Leg Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetLoad": 160.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Adductor Machine",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetLoad": 90.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Arm Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetLoad": 20.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 150.0,
              "targetPercent": 63.8,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x5 @ 150kg RPE 5; Set 2: 1x5 @ 150kg RPE 5; Set 3: 1x5 @ 150kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 150,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 150,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 150,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "2 Second Pause Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 2,
              "targetLoad": 100.0,
              "targetPercent": 76.9,
              "targetRpe": 5.5,
              "notes": "Top Set - film: 1x2 @ 100kg RPE 5.5; Set 2: 1x2 @ 100kg RPE 5.5; Set 3: 1x2 @ 105kg RPE 5.5; Set 4: 1x2 @ 105kg RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetLoad": 100,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetLoad": 100,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetLoad": 105,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 2,
                            "targetLoad": 105,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Incline Dumbbell Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 30.0,
              "targetRpe": 6.0,
              "notes": "Top Set - film: 1x8 @ 30kg RPE 6; Set 2: 1x8 @ 30kg RPE 6; Set 3: 1x8 @ 30kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 8,
                            "targetLoad": 30,
                            "targetRpe": 6,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetLoad": 30,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 8,
                            "targetLoad": 30,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Single Leg Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetLoad": 35.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Dumbbell Row",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetLoad": 35.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Machine Upper Back Row",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 6,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetLoad": 35.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 110.0,
              "targetPercent": 64.7,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x3 @ 110kg RPE 5; Set 2: 1x3 @ 110kg RPE 5; Set 3: 1x3 @ 110kg RPE 5; Set 4: 1x3 @ 110kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 110,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 110,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 110,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 110,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 3,
              "targetLoad": 107.5,
              "targetPercent": 82.7,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x3 @ 107.5kg RPE 5.5; Set 1  - film: 1x4 @ 102.5kg RPE 5; Set 2: 1x4 @ 102.5kg RPE 5; Set 3: 1x4 @ 102.5kg RPE 5; Set 4: 1x4 @ 102.5kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetLoad": 107.5,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 102.5,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 102.5,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 102.5,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetLoad": 102.5,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Walking Lunge",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Overhead Press",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Lateral Raise",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Tricep Skull Crushers",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Deadlift",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 3,
              "targetLoad": 167.5,
              "targetPercent": 71.3,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x3 @ 167.5kg RPE 5.5; Set 1 - film: 1x3 @ 155kg RPE 5; Set 2: 1x3 @ 155kg RPE 5; Set 3: 1x3 @ 155kg RPE 5; Set 4: 1x3 @ 155kg",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetLoad": 167.5,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 155,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 155,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 155,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 155
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip Larsen Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 95.0,
              "targetPercent": 73.1,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x8 @ 95kg RPE 5; Set 2: 1x8 @ 95kg RPE 5; Set 3: 1x8 @ 95kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 8,
                            "targetLoad": 95,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetLoad": 95,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 8,
                            "targetLoad": 95,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Upper Back Cable Row",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetLoad": 70.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Lat Pull Down",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set -film: 1x3 RPE 5.5; Set 1 - film: 1x5 RPE 5; Set 2: 1x5 RPE 5; Set 3: 1x5 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 5,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Set 1 - film: 1x5 RPE 5.5; Set 2: 1x5 RPE 5.5; Set 3: 1x5 RPE 5.5; Set 4: 1x5 RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetRpe": 5.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 5,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Leg Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Adductor Machine",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Arm Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetPercent": 0.0,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x5 RPE 5; Set 2: 1x5 RPE 5; Set 3: 1x5 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "2 Second Pause Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 2,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set - film: 1x2 RPE 5.5; Set 2: 1x2 RPE 5.5; Set 3: 1x2 RPE 5.5; Set 4: 1x2 RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 2,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Flat Dumbbell Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 8,
              "targetRpe": 6.0,
              "notes": "Top Set - film: 1x8 RPE 6; Set 2: 1x8 RPE 6; Set 3: 1x8 RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 8,
                            "targetRpe": 6,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 8,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Single Leg Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Dumbbell Row",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Machine Upper Back Row",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 6,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x3 RPE 5; Set 2: 1x3 RPE 5; Set 3: 1x3 RPE 5; Set 4: 1x3 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x3 RPE 5.5; Set 1  - film: 1x4 RPE 5; Set 2: 1x4 RPE 5; Set 3: 1x4 RPE 5; Set 4: 1x4 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Walking Lunge",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Overhead Press",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Lateral Raise",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Tricep Skull Crushers",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Deadlift",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x3 RPE 5.5; Set 1 - film: 1x4 RPE 5; Set 2: 1x4 RPE 5; Set 3: 1x4 RPE 5; Set 4: 1x4 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip Larsen Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 6,
              "targetPercent": 0.0,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x6 RPE 5; Set 2: 1x6 RPE 5; Set 3: 1x6 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 6,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 6,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 6,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Upper Back Cable Row",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Lat Pull Down",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 28,
      "phase": "intensification",
      "focus": "Block G Week 2/5",
      "notes": "Imported from Brad workbook sheet G 25 (G 2/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 3,
              "targetLoad": 135.0,
              "targetPercent": 79.4,
              "targetRpe": 6.5,
              "notes": "Top Set -film: 1x3 @ 135kg RPE 6.5; Set 1 - film: 1x4 @ 125kg RPE 6; Set 2: 1x4 @ 130kg RPE 6; Set 3: 1x4 @ 130kg RPE 6; Set 4: 1x4 @ 130kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetLoad": 135,
                            "targetRpe": 6.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 125,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 130,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 130,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetLoad": 130,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 5,
              "targetLoad": 105.0,
              "targetPercent": 80.8,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x5 @ 105kg RPE 6; Set 2: 1x5 @ 105kg RPE 6; Set 3: 1x5 @ 105kg RPE 6; Set 4: 1x5 @ 105kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 105,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 105,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 105,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 5,
                            "targetLoad": 105,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Leg Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetLoad": 160.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Adductor Machine",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Arm Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 170.0,
              "targetPercent": 72.3,
              "targetRpe": 6.5,
              "notes": "Set 1 - film: 1x5 @ 170kg RPE 6.5; Set 2: 1x5 @ 170kg RPE 6.5; Set 3: 1x5 @ 170kg RPE 6.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 170,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 170,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 170,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "2 Second Pause Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 2,
              "targetLoad": 105.0,
              "targetPercent": 80.8,
              "targetRpe": 6.5,
              "notes": "Set 1 - Film: 1x2 @ 105kg RPE 6.5; Set 2: 1x2 @ 105kg RPE 6.5; Set 3: 1x2 @ 105kg RPE 6.5; Set 4: 1x2 @ 105kg RPE 6.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetLoad": 105,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetLoad": 105,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 4",
                            "targetReps": 2,
                            "targetLoad": 105,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Incline Dumbbell Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 35.0,
              "targetRpe": 7.0,
              "notes": "Top Set - film: 1x8 @ 35kg RPE 7; Set 2: 1x8 @ 35kg RPE 7; Set 3: 1x8 @ 30kg RPE 7",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 8,
                            "targetLoad": 35,
                            "targetRpe": 7,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetLoad": 35,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 8,
                            "targetLoad": 30,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Single Leg Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetLoad": 35.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Dumbbell Row",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetLoad": 40.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Machine Upper Back Row",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 6,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 120.0,
              "targetPercent": 70.6,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x3 @ 120kg RPE 6; Set 2: 1x3 @ 120kg RPE 6; Set 3: 1x3 @ 120kg RPE 6; Set 4: 1x3 @ 120kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 120,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 120,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 120,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 120,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 3,
              "targetLoad": 110.0,
              "targetPercent": 84.6,
              "targetRpe": 6.5,
              "notes": "Top Set  - film: 1x3 @ 110kg RPE 6.5; Set 1  - film: 1x4 @ 105kg RPE 6; Set 2: 1x4 @ 105kg RPE 6; Set 3: 1x4 @ 105kg RPE 6; Set 4: 1x4 @ 105kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetLoad": 110,
                            "targetRpe": 6.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 105,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 105,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 105,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetLoad": 105,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Walking Lunge",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetLoad": 35.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Overhead Press",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetLoad": 30.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Lateral Raise",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetLoad": 35.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Tricep Skull Crushers",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetLoad": 12.5,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Deadlift",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 3,
              "targetLoad": 175.0,
              "targetPercent": 74.5,
              "targetRpe": 6.5,
              "notes": "Top Set  - film: 1x3 @ 175kg RPE 6.5; Set 1 - film: 1x3 @ 160kg; Set 2: 1x3 @ 160kg; Set 3: 1x3 @ 160kg; Set 4: 1x3 @ 160kg",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetLoad": 175,
                            "targetRpe": 6.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 160,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 160
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 160
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 160
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip Larsen Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 97.5,
              "targetPercent": 75.0,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x8 @ 97.5kg RPE 6; Set 2: 1x8 @ 95kg RPE 6; Set 3: 1x8 @ 90kg RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 8,
                            "targetLoad": 97.5,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetLoad": 95,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 8,
                            "targetLoad": 90,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Upper Back Cable Row",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetLoad": 75.0,
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Lat Pull Down",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set -film: 1x3 RPE 5.5; Set 1 - film: 1x5 RPE 5; Set 2: 1x5 RPE 5; Set 3: 1x5 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 5,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Set 1 - film: 1x5 RPE 5.5; Set 2: 1x5 RPE 5.5; Set 3: 1x5 RPE 5.5; Set 4: 1x5 RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetRpe": 5.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 5,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Leg Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Adductor Machine",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Arm Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetPercent": 0.0,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x5 RPE 5; Set 2: 1x5 RPE 5; Set 3: 1x5 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "2 Second Pause Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 2,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set - film: 1x2 RPE 5.5; Set 2: 1x2 RPE 5.5; Set 3: 1x2 RPE 5.5; Set 4: 1x2 RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 2,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Flat Dumbbell Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 8,
              "targetRpe": 6.0,
              "notes": "Top Set - film: 1x8 RPE 6; Set 2: 1x8 RPE 6; Set 3: 1x8 RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 8,
                            "targetRpe": 6,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 8,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Single Leg Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Dumbbell Row",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Machine Upper Back Row",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 6,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x3 RPE 5; Set 2: 1x3 RPE 5; Set 3: 1x3 RPE 5; Set 4: 1x3 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x3 RPE 5.5; Set 1  - film: 1x4 RPE 5; Set 2: 1x4 RPE 5; Set 3: 1x4 RPE 5; Set 4: 1x4 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Walking Lunge",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Overhead Press",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Lateral Raise",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Tricep Skull Crushers",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Deadlift",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x3 RPE 5.5; Set 1 - film: 1x4 RPE 5; Set 2: 1x4 RPE 5; Set 3: 1x4 RPE 5; Set 4: 1x4 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip Larsen Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 6,
              "targetPercent": 0.0,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x6 RPE 5; Set 2: 1x6 RPE 5; Set 3: 1x6 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 6,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 6,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 6,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Upper Back Cable Row",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Lat Pull Down",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 29,
      "phase": "intensification",
      "focus": "Block G Week 3/5",
      "notes": "Imported from Brad workbook sheet G 35 (G 3/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 3,
              "targetLoad": 140.0,
              "targetPercent": 82.4,
              "targetRpe": 7.5,
              "notes": "Top Set -film: 1x3 @ 140kg RPE 7.5; Set 1 - film: 1x4 @ 130kg RPE 7; Set 2: 1x4 @ 130kg RPE 7; Set 3: 1x4 @ 130kg RPE 7; Set 4: 1x4 @ 130kg RPE 7",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetLoad": 140,
                            "targetRpe": 7.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 130,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 130,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 130,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetLoad": 130,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 5,
              "targetLoad": 110.0,
              "targetPercent": 84.6,
              "targetRpe": 7.0,
              "notes": "Set 1 - film: 1x5 @ 110kg RPE 7; Set 2: 1x5 @ 110kg RPE 7; Set 3: 1x5 @ 110kg RPE 7; Set 4: 1x5 @ 110kg RPE 7",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 110,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 110,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 110,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 5,
                            "targetLoad": 110,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Leg Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Adductor Machine",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Arm Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 180.0,
              "targetPercent": 76.6,
              "targetRpe": 7.0,
              "notes": "Set 1 - film: 1x5 @ 180kg RPE 7; Set 2: 1x5 @ 170kg RPE 7; Set 3: 1x5 @ 170kg RPE 7",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 180,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 170,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 170,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "2 Second Pause Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 2,
              "targetLoad": 107.5,
              "targetPercent": 82.7,
              "targetRpe": 7.5,
              "notes": "Set 1 - Film: 1x2 @ 107.5kg RPE 7.5; Set 2: 1x2 @ 107.5kg RPE 7.5; Set 3: 1x2 @ 107.5kg RPE 7.5; Set 4: 1x2 @ 107.5kg RPE 7.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetLoad": 107.5,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetLoad": 107.5,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 4",
                            "targetReps": 2,
                            "targetLoad": 107.5,
                            "targetRpe": 7.5
                  }
        ]
      
            },
            {
              "exerciseName": "Incline Dumbbell Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 35.0,
              "targetRpe": 8.0,
              "notes": "Top Set - film: 1x8 @ 35kg RPE 8; Set 2: 1x8 @ 35kg RPE 8; Set 3: 1x8 @ 35kg RPE 8",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 8,
                            "targetLoad": 35,
                            "targetRpe": 8,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetLoad": 35,
                            "targetRpe": 8
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 8,
                            "targetLoad": 35,
                            "targetRpe": 8
                  }
        ]
      
            },
            {
              "exerciseName": "Single Leg Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetLoad": 35.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Dumbbell Row",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Machine Upper Back Row",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 6,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 130.0,
              "targetPercent": 76.5,
              "targetRpe": 6.5,
              "notes": "Set 1 - film: 1x3 @ 130kg RPE 6.5; Set 2: 1x3 @ 130kg RPE 6.5; Set 3: 1x3 @ 135kg RPE 6.5; Set 4: 1x3 @ 135kg RPE 6.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 130,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 130,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 135,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 135,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 3,
              "targetLoad": 115.0,
              "targetPercent": 88.5,
              "targetRpe": 7.5,
              "notes": "Top Set  - film: 1x3 @ 115kg RPE 7.5; Set 1  - film: 1x4 @ 110kg RPE 7; Set 2: 1x4 @ 110kg RPE 7; Set 3: 1x4 @ 110kg RPE 7; Set 4: 1x4 RPE 7",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetLoad": 115,
                            "targetRpe": 7.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 110,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 110,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 110,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Walking Lunge",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Overhead Press",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetLoad": 30.0,
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Lateral Raise",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Tricep Skull Crushers",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Deadlift",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 3,
              "targetLoad": 185.0,
              "targetPercent": 78.7,
              "targetRpe": 7.5,
              "notes": "Top Set  - film: 1x3 @ 185kg RPE 7.5; Set 1 - film: 1x3 @ 170kg RPE 7; Set 2: 1x3 @ 170kg RPE 6.5; Set 3: 1x3 @ 170kg RPE 6.5; Set 4: 1x3 @ 170kg RPE 7",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetLoad": 185,
                            "targetRpe": 7.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 170,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 170,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 170,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 170,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip Larsen Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 95.0,
              "targetPercent": 73.1,
              "targetRpe": 7.0,
              "notes": "Set 1 - film: 1x8 @ 95kg RPE 7; Set 2: 1x8 @ 92.5kg RPE 7; Set 3: 1x8 @ 92.5kg RPE 7",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 8,
                            "targetLoad": 95,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetLoad": 92.5,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 8,
                            "targetLoad": 92.5,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Upper Back Cable Row",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Lat Pull Down",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set -film: 1x3 RPE 5.5; Set 1 - film: 1x5 RPE 5; Set 2: 1x5 RPE 5; Set 3: 1x5 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 5,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Set 1 - film: 1x5 RPE 5.5; Set 2: 1x5 RPE 5.5; Set 3: 1x5 RPE 5.5; Set 4: 1x5 RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetRpe": 5.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 5,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Leg Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Adductor Machine",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Arm Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetPercent": 0.0,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x5 RPE 5; Set 2: 1x5 RPE 5; Set 3: 1x5 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "2 Second Pause Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 2,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set - film: 1x2 RPE 5.5; Set 2: 1x2 RPE 5.5; Set 3: 1x2 RPE 5.5; Set 4: 1x2 RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 2,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Flat Dumbbell Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 8,
              "targetRpe": 6.0,
              "notes": "Top Set - film: 1x8 RPE 6; Set 2: 1x8 RPE 6; Set 3: 1x8 RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 8,
                            "targetRpe": 6,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 8,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Single Leg Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Dumbbell Row",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Machine Upper Back Row",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 6,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x3 RPE 5; Set 2: 1x3 RPE 5; Set 3: 1x3 RPE 5; Set 4: 1x3 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x3 RPE 5.5; Set 1  - film: 1x4 RPE 5; Set 2: 1x4 RPE 5; Set 3: 1x4 RPE 5; Set 4: 1x4 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Walking Lunge",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Overhead Press",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Lateral Raise",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Tricep Skull Crushers",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Deadlift",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x3 RPE 5.5; Set 1 - film: 1x4 RPE 5; Set 2: 1x4 RPE 5; Set 3: 1x4 RPE 5; Set 4: 1x4 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip Larsen Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 6,
              "targetPercent": 0.0,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x6 RPE 5; Set 2: 1x6 RPE 5; Set 3: 1x6 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 6,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 6,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 6,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Upper Back Cable Row",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Lat Pull Down",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 30,
      "phase": "intensification",
      "focus": "Block G Week 4/5",
      "notes": "Imported from Brad workbook sheet G 45 (G 4/5); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 3,
              "targetLoad": 145.0,
              "targetPercent": 85.3,
              "targetRpe": 8.5,
              "notes": "Top Set -film: 1x3 @ 145kg RPE 8.5 (8.5 (145)); Set 1 - film: 1x4 @ 135kg RPE 7.5 (7.5 (135)); Set 2: 1x4 @ 135kg RPE 7.5 (7.5 (135)); Set 3: 1x4 @ 135kg RPE 7.5 (7.5 (135)); Set 4: 1x4 RPE 7.5 (7.5 (135))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetLoad": 145,
                            "targetRpe": 8.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 135,
                            "targetRpe": 7.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 135,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 135,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetRpe": 7.5
                  }
        ]
      
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 4,
              "targetLoad": 112.5,
              "targetPercent": 86.5,
              "targetRpe": 8.0,
              "notes": "Set 1 - film: 1x4 @ 112.5kg RPE 8 (8 (112.5)); Set 2: 1x4 @ 112.5kg RPE 8 (8 (112.5)); Set 3: 1x5 @ 110kg RPE 8 (8 (112.5)); Set 4: 1x5 RPE 8 (8 (112.5))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 112.5,
                            "targetRpe": 8,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 112.5,
                            "targetRpe": 8
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 110,
                            "targetRpe": 8
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 5,
                            "targetRpe": 8
                  }
        ]
      
            },
            {
              "exerciseName": "Leg Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Adductor Machine",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Arm Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 180.0,
              "targetPercent": 76.6,
              "targetRpe": 7.5,
              "notes": "Set 1 - film: 1x5 @ 180kg RPE 7.5 (7.5 (175)); Set 2: 1x5 @ 180kg RPE 7.5 (7.5 (175)); Set 3: 1x5 @ 175kg RPE 7.5 (7.5 (175))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetLoad": 180,
                            "targetRpe": 7.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 180,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 175,
                            "targetRpe": 7.5
                  }
        ]
      
            },
            {
              "exerciseName": "2 Second Pause Bench",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 2,
              "targetLoad": 110.0,
              "targetPercent": 84.6,
              "targetRpe": 8.5,
              "notes": "Set 1 - Film: 1x2 @ 110kg RPE 8.5 (8.5 (112.5)); Set 2: 1x2 @ 105kg RPE 8.5 (8.5 (112.5)); Set 3: 1x2 @ 105kg RPE 8.5 (8.5 (112.5))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetLoad": 105,
                            "targetRpe": 8.5
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetLoad": 105,
                            "targetRpe": 8.5
                  }
        ]
      
            },
            {
              "exerciseName": "Incline Dumbbell Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 8,
              "targetRpe": 8.5,
              "notes": "Top Set - film: 1x8 RPE 8.5; Set 2: 1x8 RPE 8.5; Set 3: 1x8 RPE 8.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 8,
                            "targetRpe": 8.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetRpe": 8.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 8,
                            "targetRpe": 8.5
                  }
        ]
      
            },
            {
              "exerciseName": "Single Leg Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Dumbbell Row",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Machine Upper Back Row",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 6,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 140.0,
              "targetPercent": 82.4,
              "targetRpe": 7.5,
              "notes": "Set 1 - film: 1x3 @ 140kg RPE 7.5 (7.5 (140)); Set 2: 1x3 @ 140kg RPE 7.5 (7.5 (140)); Set 3: 1x3 @ 140kg RPE 7.5 (7.5 (140)); Set 4: 1x3 RPE 7.5 (7.5 (140))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 140,
                            "targetRpe": 7.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 140,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 140,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetRpe": 7.5
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 3,
              "targetLoad": 115.0,
              "targetPercent": 88.5,
              "targetRpe": 8.5,
              "notes": "Top Set  - film: 1x3 @ 115kg RPE 8.5 (8.5 (115)); Set 1  - film: 1x4 @ 110kg RPE 7.5 (7.5 (110)); Set 2: 1x4 @ 110kg RPE 7.5 (7.5 (110)); Set 3: 1x4 @ 110kg RPE 7.5 (7.5 (110)); Set 4: 1x4 RPE 7.5 (7.5 (110))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetLoad": 115,
                            "targetRpe": 8.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetLoad": 110,
                            "targetRpe": 7.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 110,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 110,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetRpe": 7.5
                  }
        ]
      
            },
            {
              "exerciseName": "Walking Lunge",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Overhead Press",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Lateral Raise",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Tricep Skull Crushers",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Deadlift",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 3,
              "targetLoad": 195.0,
              "targetPercent": 83.0,
              "targetRpe": 8.5,
              "notes": "Top Set  - film: 1x3 @ 195kg RPE 8.5 (8.5 (195)); Set 1 - film: 1x3 @ 175kg RPE 8; Set 2: 1x3 @ 175kg RPE 8; Set 3: 1x3 @ 175kg RPE 8.5; Set 4: 1x3 @ 175kg",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetLoad": 195,
                            "targetRpe": 8.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 175,
                            "targetRpe": 8,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 175,
                            "targetRpe": 8
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 175,
                            "targetRpe": 8.5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 175
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip Larsen Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 8,
              "targetLoad": 95.0,
              "targetPercent": 73.1,
              "targetRpe": 7.5,
              "notes": "Set 1 - film: 1x8 @ 95kg RPE 7.5 (7.5 (95-97.5)); Set 2: 1x8 @ 95kg RPE 7.5 (7.5 (95-97.5)); Set 3: 1x8 RPE 7.5 (7.5 (95-97.5))",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 8,
                            "targetLoad": 95,
                            "targetRpe": 7.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetLoad": 95,
                            "targetRpe": 7.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 8,
                            "targetRpe": 7.5
                  }
        ]
      
            },
            {
              "exerciseName": "Upper Back Cable Row",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Lat Pull Down",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 8.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set -film: 1x3 RPE 5.5; Set 1 - film: 1x5 RPE 5; Set 2: 1x5 RPE 5; Set 3: 1x5 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 5,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Set 1 - film: 1x5 RPE 5.5; Set 2: 1x5 RPE 5.5; Set 3: 1x5 RPE 5.5; Set 4: 1x5 RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetRpe": 5.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 5,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Leg Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Adductor Machine",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Arm Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetPercent": 0.0,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x5 RPE 5; Set 2: 1x5 RPE 5; Set 3: 1x5 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "2 Second Pause Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 2,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set - film: 1x2 RPE 5.5; Set 2: 1x2 RPE 5.5; Set 3: 1x2 RPE 5.5; Set 4: 1x2 RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 2,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Flat Dumbbell Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 8,
              "targetRpe": 6.0,
              "notes": "Top Set - film: 1x8 RPE 6; Set 2: 1x8 RPE 6; Set 3: 1x8 RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 8,
                            "targetRpe": 6,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 8,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Single Leg Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Dumbbell Row",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Machine Upper Back Row",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 6,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x3 RPE 5; Set 2: 1x3 RPE 5; Set 3: 1x3 RPE 5; Set 4: 1x3 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x3 RPE 5.5; Set 1  - film: 1x4 RPE 5; Set 2: 1x4 RPE 5; Set 3: 1x4 RPE 5; Set 4: 1x4 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Walking Lunge",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Overhead Press",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Lateral Raise",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Tricep Skull Crushers",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Deadlift",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x3 RPE 5.5; Set 1 - film: 1x4 RPE 5; Set 2: 1x4 RPE 5; Set 3: 1x4 RPE 5; Set 4: 1x4 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip Larsen Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 6,
              "targetPercent": 0.0,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x6 RPE 5; Set 2: 1x6 RPE 5; Set 3: 1x6 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 6,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 6,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 6,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Upper Back Cable Row",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Lat Pull Down",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 31,
      "phase": "deload",
      "focus": "H (deload week)",
      "notes": "Imported from Brad workbook sheet H (deload week) (H (deload week)); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 125.0,
              "targetPercent": 73.5,
              "targetRpe": 5.0,
              "notes": "Set 1 - film (Top set added next week): 1x5 @ 125kg RPE 5; Set 2: 1x5 @ 120kg RPE 5; Set 3: 1x5 @ 120kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 120,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 120,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 3,
              "targetLoad": 100.0,
              "targetPercent": 76.9,
              "targetRpe": 5.5,
              "notes": "Set 1 - film (These will change to 2s next week): 1x3 @ 100kg RPE 5.5; Set 2: 1x3 @ 100kg RPE 5.5; Set 3: 1x3 @ 100kg RPE 5.5; Set 4: 1x3 @ 100kg RPE 5.5; Set 5: 1x3 @ 100kg RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 100,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 100,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 100,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 5",
                            "targetReps": 3,
                            "targetLoad": 100,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Leg Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Quad Extensions",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetLoad": 100.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Arm Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Decline Bench Situp",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 2,
              "targetReps": 6,
              "targetLoad": 155.0,
              "targetPercent": 66.0,
              "targetRpe": 5.0,
              "notes": "Set 1 - film (we will add one set next week): 1x6 @ 155kg RPE 5; Set 2: 1x6 @ 155kg RPE 5"
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 5,
              "targetLoad": 100.0,
              "targetPercent": 76.9,
              "targetRpe": 5.5,
              "notes": "Set 1 - Film: 1x5 @ 100kg RPE 5.5; Set 2: 1x5 @ 100kg RPE 5.5; Set 3: 1x5 @ 100kg RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetLoad": 100,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetLoad": 100,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Incline Dumbbell Press",
              "orderIndex": 2,
              "targetSets": 2,
              "targetReps": 10,
              "targetLoad": 35.0,
              "targetRpe": 6.0,
              "notes": "Top Set - film: 1x10 @ 35kg RPE 6; Set 2: 1x10 @ 35kg RPE 6"
            },
            {
              "exerciseName": "Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetLoad": 82.5,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Dumbbell Row",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Machine Upper Back Row",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetLoad": 90.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 6,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetLoad": 130.0,
              "targetPercent": 76.5,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x3 @ 130kg RPE 5; Set 2: 1x3 @ 130kg RPE 5; Set 3: 1x3 @ 130kg RPE 5; Set 4: 1x3 @ 130kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetLoad": 130,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetLoad": 130,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetLoad": 130,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetLoad": 130,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 4,
              "targetLoad": 105.0,
              "targetPercent": 80.8,
              "targetRpe": 5.5,
              "notes": "Set 1  - film (Top set added next week): 1x4 @ 105kg RPE 5.5; Set 2: 1x4 @ 105kg RPE 5.5; Set 3: 1x4 @ 105kg RPE 5.5; Set 4: 1x4 @ 105kg RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 105,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 105,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetLoad": 105,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Cable Pec Fly",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetLoad": 75.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Lateral Raise",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetLoad": 12.5,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Tricep Push Down",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Deadlift",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 4,
              "targetLoad": 160.0,
              "targetPercent": 68.1,
              "targetRpe": 5.0,
              "notes": "Set 1 - film (Top set added next week): 1x4 @ 160kg RPE 5; Set 2: 1x4 @ 160kg RPE 5; Set 3: 1x4 @ 160kg RPE 5; Set 4: 1x4 @ 160kg RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetLoad": 160,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetLoad": 160,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetLoad": 160,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 6,
              "targetLoad": 90.0,
              "targetPercent": 69.2,
              "targetRpe": 5.5,
              "notes": "Set 1 - film: 1x6 @ 90kg RPE 5.5; Set 2: 1x6 @ 92.5kg RPE 5.5; Set 3: 1x6 @ 92.8kg RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 6,
                            "targetLoad": 90,
                            "targetRpe": 5.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 6,
                            "targetLoad": 92.5,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 6,
                            "targetLoad": 92.8,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "45 Degree Back Extension",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetLoad": 50.0,
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Lat Pull Down",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Ab Cruches",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set -film: 1x3 RPE 5.5; Set 1 - film: 1x5 RPE 5; Set 2: 1x5 RPE 5; Set 3: 1x5 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 5,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Set 1 - film: 1x5 RPE 5.5; Set 2: 1x5 RPE 5.5; Set 3: 1x5 RPE 5.5; Set 4: 1x5 RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetRpe": 5.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 5,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Leg Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Adductor Machine",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Arm Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetPercent": 0.0,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x5 RPE 5; Set 2: 1x5 RPE 5; Set 3: 1x5 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "2 Second Pause Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 2,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set - film: 1x2 RPE 5.5; Set 2: 1x2 RPE 5.5; Set 3: 1x2 RPE 5.5; Set 4: 1x2 RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 2,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Flat Dumbbell Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 8,
              "targetRpe": 6.0,
              "notes": "Top Set - film: 1x8 RPE 6; Set 2: 1x8 RPE 6; Set 3: 1x8 RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 8,
                            "targetRpe": 6,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 8,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Single Leg Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Dumbbell Row",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Machine Upper Back Row",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 6,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x3 RPE 5; Set 2: 1x3 RPE 5; Set 3: 1x3 RPE 5; Set 4: 1x3 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x3 RPE 5.5; Set 1  - film: 1x4 RPE 5; Set 2: 1x4 RPE 5; Set 3: 1x4 RPE 5; Set 4: 1x4 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Walking Lunge",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Overhead Press",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Lateral Raise",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Tricep Skull Crushers",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Deadlift",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x3 RPE 5.5; Set 1 - film: 1x4 RPE 5; Set 2: 1x4 RPE 5; Set 3: 1x4 RPE 5; Set 4: 1x4 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip Larsen Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 6,
              "targetPercent": 0.0,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x6 RPE 5; Set 2: 1x6 RPE 5; Set 3: 1x6 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 6,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 6,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 6,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Upper Back Cable Row",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Lat Pull Down",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 32,
      "phase": "peak",
      "focus": "H 14",
      "notes": "Imported from Brad workbook sheet H 14 (H 14); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 2,
              "targetPercent": 0.0,
              "targetRpe": 6.5,
              "notes": "Top Set -film: 1x2 RPE 6.5; Set 1 - film: 1x5 RPE 6; Set 2: 1x5 RPE 6; Set 3: 1x5 RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetRpe": 6.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 2,
              "targetPercent": 0.0,
              "targetRpe": 6.5,
              "notes": "Set 1 - film: 1x2 RPE 6.5; Set 2: 1x2 RPE 6.5; Set 3: 1x2 RPE 6.5; Set 4: 1x2 RPE 6.5; Set 5: 1x2 RPE 6.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 2,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 2,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 5",
                            "targetReps": 2,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Leg Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Quad Extensions",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Arm Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Decline Bench Situp",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 6,
              "targetPercent": 0.0,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x6 RPE 6; Set 2: 1x6 RPE 6; Set 3: 1x6 RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 6,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 6,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 6,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 5,
              "targetPercent": 0.0,
              "targetRpe": 6.5,
              "notes": "Set 1 - Film: 1x5 RPE 6.5; Set 2: 1x5 RPE 6.5; Set 3: 1x5 RPE 6.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Incline Dumbbell Press",
              "orderIndex": 2,
              "targetSets": 2,
              "targetReps": 10,
              "targetRpe": 7.0,
              "notes": "Top Set - film: 1x10 RPE 7; Set 2: 1x10 RPE 7"
            },
            {
              "exerciseName": "Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Dumbbell Row",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Machine Upper Back Row",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 6,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x3 RPE 6; Set 2: 1x3 RPE 6; Set 3: 1x3 RPE 6; Set 4: 1x3 RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 2,
              "targetPercent": 0.0,
              "targetRpe": 6.5,
              "notes": "Top Set - film: 1x2 RPE 6.5; Set 1- film: 1x4 RPE 6; Set 2: 1x4 RPE 6; Set 3: 1x4 RPE 6; Set 4: 1x4 RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetRpe": 6.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Cable Pec Fly",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Lateral Raise",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Tricep Push Down",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Deadlift",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 2,
              "targetPercent": 0.0,
              "targetRpe": 6.5,
              "notes": "Top Set - film: 1x2 RPE 6.5; Set 1 - film: 1x4 RPE 6; Set 2: 1x4 RPE 6; Set 3: 1x4 RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetRpe": 6.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 6,
              "targetPercent": 0.0,
              "targetRpe": 6.0,
              "notes": "Set 1 - film: 1x6 RPE 6; Set 2: 1x6 RPE 6; Set 3: 1x6 RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 6,
                            "targetRpe": 6,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 6,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 6,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "45 Degree Back Extension",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Lat Pull Down",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Ab Cruches",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.0,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set -film: 1x3 RPE 5.5; Set 1 - film: 1x5 RPE 5; Set 2: 1x5 RPE 5; Set 3: 1x5 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 5,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Set 1 - film: 1x5 RPE 5.5; Set 2: 1x5 RPE 5.5; Set 3: 1x5 RPE 5.5; Set 4: 1x5 RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetRpe": 5.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 5,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Leg Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Adductor Machine",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Arm Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetPercent": 0.0,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x5 RPE 5; Set 2: 1x5 RPE 5; Set 3: 1x5 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "2 Second Pause Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 2,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set - film: 1x2 RPE 5.5; Set 2: 1x2 RPE 5.5; Set 3: 1x2 RPE 5.5; Set 4: 1x2 RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 2,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Flat Dumbbell Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 8,
              "targetRpe": 6.0,
              "notes": "Top Set - film: 1x8 RPE 6; Set 2: 1x8 RPE 6; Set 3: 1x8 RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 8,
                            "targetRpe": 6,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 8,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Single Leg Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Dumbbell Row",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Machine Upper Back Row",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 6,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x3 RPE 5; Set 2: 1x3 RPE 5; Set 3: 1x3 RPE 5; Set 4: 1x3 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x3 RPE 5.5; Set 1  - film: 1x4 RPE 5; Set 2: 1x4 RPE 5; Set 3: 1x4 RPE 5; Set 4: 1x4 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Walking Lunge",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Overhead Press",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Lateral Raise",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Tricep Skull Crushers",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Deadlift",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x3 RPE 5.5; Set 1 - film: 1x4 RPE 5; Set 2: 1x4 RPE 5; Set 3: 1x4 RPE 5; Set 4: 1x4 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip Larsen Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 6,
              "targetPercent": 0.0,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x6 RPE 5; Set 2: 1x6 RPE 5; Set 3: 1x6 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 6,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 6,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 6,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Upper Back Cable Row",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Lat Pull Down",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    },
    {
      "weekNumber": 33,
      "phase": "peak",
      "focus": "H 24",
      "notes": "Imported from Brad workbook sheet H 24 (H 24); PR Tracker ignored.",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 2,
              "targetPercent": 0.0,
              "targetRpe": 7.5,
              "notes": "Top Set -film: 1x2 RPE 7.5; Set 1 - film: 1x5 RPE 6.5; Set 2: 1x5 RPE 6.5; Set 3: 1x5 RPE 6.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetRpe": 7.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 2,
              "targetPercent": 0.0,
              "targetRpe": 7.0,
              "notes": "Set 1 - film: 1x2 RPE 7; Set 2: 1x2 RPE 7; Set 3: 1x2 RPE 7; Set 4: 1x2 RPE 7; Set 5: 1x2 RPE 7",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 2,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 2,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 5",
                            "targetReps": 2,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Leg Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Quad Extensions",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Arm Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Decline Bench Situp",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 6,
              "targetPercent": 0.0,
              "targetRpe": 6.5,
              "notes": "Set 1 - film: 1x6 RPE 6.5; Set 2: 1x6 RPE 6.5; Set 3: 1x6 RPE 6.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 6,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 6,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 6,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 5,
              "targetPercent": 0.0,
              "targetRpe": 7.0,
              "notes": "Set 1 - Film: 1x5 RPE 7; Set 2: 1x5 RPE 7; Set 3: 1x5 RPE 7",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Incline Dumbbell Press",
              "orderIndex": 2,
              "targetSets": 2,
              "targetReps": 10,
              "targetRpe": 8.0,
              "notes": "Top Set - film: 1x10 RPE 8; Set 2: 1x10 RPE 8"
            },
            {
              "exerciseName": "Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Dumbbell Row",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Machine Upper Back Row",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 6,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 6.5,
              "notes": "Set 1 - film: 1x3 RPE 6.5; Set 2: 1x3 RPE 6.5; Set 3: 1x3 RPE 6.5; Set 4: 1x3 RPE 6.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 2,
              "targetPercent": 0.0,
              "targetRpe": 7.5,
              "notes": "Top Set - film: 1x2 RPE 7.5; Set 1- film: 1x4 RPE 7; Set 2: 1x4 RPE 7; Set 3: 1x4 RPE 7; Set 4: 1x4 RPE 7",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetRpe": 7.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "Cable Pec Fly",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Lateral Raise",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Tricep Push Down",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Deadlift",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 2,
              "targetPercent": 0.0,
              "targetRpe": 7.5,
              "notes": "Top Set - film: 1x2 RPE 7.5; Set 1 - film: 1x4 RPE 6.5; Set 2: 1x4 RPE 6.5; Set 3: 1x4 RPE 6.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetRpe": 7.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetRpe": 6.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetRpe": 6.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetRpe": 6.5
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 6,
              "targetPercent": 0.0,
              "targetRpe": 7.0,
              "notes": "Set 1 - film: 1x6 RPE 7; Set 2: 1x6 RPE 7; Set 3: 1x6 RPE 7",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 6,
                            "targetRpe": 7,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 6,
                            "targetRpe": 7
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 6,
                            "targetRpe": 7
                  }
        ]
      
            },
            {
              "exerciseName": "45 Degree Back Extension",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Lat Pull Down",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Ab Cruches",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 7.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 1,
          "title": "Day 1 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set -film: 1x3 RPE 5.5; Set 1 - film: 1x5 RPE 5; Set 2: 1x5 RPE 5; Set 3: 1x5 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Comp Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 5,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Set 1 - film: 1x5 RPE 5.5; Set 2: 1x5 RPE 5.5; Set 3: 1x5 RPE 5.5; Set 4: 1x5 RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetRpe": 5.5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 5,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Leg Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Adductor Machine",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Single Arm Tricep Extension",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 2,
          "title": "Day 2 - Deadlift + Bench",
          "mainFocus": "deadlift + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Deadlift",
              "orderIndex": 0,
              "targetSets": 3,
              "targetReps": 5,
              "targetPercent": 0.0,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x5 RPE 5; Set 2: 1x5 RPE 5; Set 3: 1x5 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 5,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 5,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 5,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "2 Second Pause Bench",
              "orderIndex": 1,
              "targetSets": 4,
              "targetReps": 2,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set - film: 1x2 RPE 5.5; Set 2: 1x2 RPE 5.5; Set 3: 1x2 RPE 5.5; Set 4: 1x2 RPE 5.5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 2,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 2,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 2,
                            "targetRpe": 5.5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 2,
                            "targetRpe": 5.5
                  }
        ]
      
            },
            {
              "exerciseName": "Flat Dumbbell Press",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 8,
              "targetRpe": 6.0,
              "notes": "Top Set - film: 1x8 RPE 6; Set 2: 1x8 RPE 6; Set 3: 1x8 RPE 6",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 8,
                            "targetRpe": 6,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 8,
                            "targetRpe": 6
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 8,
                            "targetRpe": 6
                  }
        ]
      
            },
            {
              "exerciseName": "Single Leg Hamstring Curl",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Dumbbell Row",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Machine Upper Back Row",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 6,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 3,
          "title": "Day 3 - Squat + Bench",
          "mainFocus": "squat + bench",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Pause Squat",
              "orderIndex": 0,
              "targetSets": 4,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x3 RPE 5; Set 2: 1x3 RPE 5; Set 3: 1x3 RPE 5; Set 4: 1x3 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 3,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 3,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 3,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 4",
                            "targetReps": 3,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Pause Bench",
              "orderIndex": 1,
              "targetSets": 5,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x3 RPE 5.5; Set 1  - film: 1x4 RPE 5; Set 2: 1x4 RPE 5; Set 3: 1x4 RPE 5; Set 4: 1x4 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Walking Lunge",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Overhead Press",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 10, "targetRepRange": "8-10",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Lateral Raise",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Dumbbell Tricep Skull Crushers",
              "orderIndex": 5,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        },
        {
          "dayNumber": 4,
          "title": "Day 4 - Deadlift",
          "mainFocus": "deadlift",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseName": "Comp Deadlift",
              "orderIndex": 0,
              "targetSets": 5,
              "targetReps": 3,
              "targetPercent": 0.0,
              "targetRpe": 5.5,
              "notes": "Top Set  - film: 1x3 RPE 5.5; Set 1 - film: 1x4 RPE 5; Set 2: 1x4 RPE 5; Set 3: 1x4 RPE 5; Set 4: 1x4 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Top Set",
                            "targetReps": 3,
                            "targetRpe": 5.5,
                            "notes": "Top Set - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 1",
                            "targetReps": 4,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 2",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 4,
                            "setLabel": "Set 3",
                            "targetReps": 4,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 5,
                            "setLabel": "Set 4",
                            "targetReps": 4,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Close Grip Larsen Press",
              "orderIndex": 1,
              "targetSets": 3,
              "targetReps": 6,
              "targetPercent": 0.0,
              "targetRpe": 5.0,
              "notes": "Set 1 - film: 1x6 RPE 5; Set 2: 1x6 RPE 5; Set 3: 1x6 RPE 5",
        "sets":           [
                  {
                            "setNumber": 1,
                            "setLabel": "Set 1",
                            "targetReps": 6,
                            "targetRpe": 5,
                            "notes": "Set 1 - film"
                  },
                  {
                            "setNumber": 2,
                            "setLabel": "Set 2",
                            "targetReps": 6,
                            "targetRpe": 5
                  },
                  {
                            "setNumber": 3,
                            "setLabel": "Set 3",
                            "targetReps": 6,
                            "targetRpe": 5
                  }
        ]
      
            },
            {
              "exerciseName": "Upper Back Cable Row",
              "orderIndex": 2,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "SIngle Arm Lat Pull Down",
              "orderIndex": 3,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            },
            {
              "exerciseName": "Cable Bicep Curl",
              "orderIndex": 4,
              "targetSets": 3,
              "targetReps": 12, "targetRepRange": "10-12",
              "targetRpe": 6.5,
              "accessoryCategory": "accessory",
              "notes": "Accessory movement from Brad workbook"
            }
          ]
        }
      ]
    }
  ]
};
