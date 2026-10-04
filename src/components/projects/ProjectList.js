import React from 'react';
import { ProjectCard } from '../cards/ProjectCard';
import { EmptyState } from '../common/EmptyState';

export function ProjectList({ projects, financialsById, onPressProject, onAdd }) {
  if (!projects?.length) {
    return (
      <EmptyState
        icon="office-building-outline"
        title="No projects yet"
        message="Create a project to start tracking revenue and expenses."
        actionLabel={onAdd ? 'Add project' : undefined}
        onAction={onAdd}
      />
    );
  }
  return projects.map((project) => (
    <ProjectCard
      key={project.id}
      project={project}
      financials={financialsById?.[project.id]}
      onPress={() => onPressProject(project)}
    />
  ));
}
