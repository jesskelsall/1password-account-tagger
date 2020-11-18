import { partition } from 'lodash/fp'
import { Section, PreparedTag, SectionOfTags } from './types'

// Return sections containing tags which can be converted into inquirer questions
// Returns tags grouped by section or one big section
export const groupTagsIntoSections = (
  tags: PreparedTag[],
  sections: Section[],
  groupBySection: boolean,
): SectionOfTags[] => {
  if (!groupBySection) {
    // Return one section that includes all tags
    return [{
      name: 'All Tags',
      tags,
      value: '_all',
    }]
  }

  // Split tags that will be placed in named sections from all others
  // A tag's section must be defined in sections.ts to count
  const validSections = sections.map((section) => section.value)
  const [sectionTags, otherTags] = partition(
    (tag) => tag.section && validSections.includes(tag.section),
    tags,
  )

  // Collect tags into each section
  const sectionsOfTags: SectionOfTags[] = [
    ...sections.map((section) => ({
      ...section,
      tags: sectionTags.filter((tag) => tag.section === section.value),
    })),
    // Create a section that includes all other tags
    {
      name: 'Other Tags',
      tags: otherTags,
      value: '_other',
    },
  ]

  // Remove any sections that contain no tags
  return sectionsOfTags.filter((section) => section.tags.length)
}
