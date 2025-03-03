"use client";

import useProject from "./useProject";
import { PageHeader } from "@/components/PageHeader";
import { useState } from "react";
import DataGrid from "@/components/DataGrid";
import { ProjectColumns } from "@/constant/projects";
import Button from "@/components/Button";
import ProjectModal from "./ProjectModal";

export default function Project() {
  const { projects, loading, error, createProject } = useProject();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  function handleProjectModal(e: any) {
    setIsProjectModalOpen(true);
  }

  function handleClose() {
    setIsProjectModalOpen(false);
  }

  async function handleProject(e: any) {
    const formData = new FormData(e.target);
    const project = Object.fromEntries(formData.entries());
    await createProject({
    name: project.name as string,
    buHead: project.buHead as string,
    delieveryManager: project.delieveryManager as string,
    billingType: project.billingType as string,
  });
  }

  return (
    <>
      <PageHeader title="Project Details" />
      <div className="flex justify-end">
        <Button onClick={handleProjectModal}>Add New Project</Button>
      </div>
      <DataGrid
        columns={ProjectColumns}
        data={[]}
        emptyMessage="No Projects have been added, Please add a Project 😊"
      />
      {isProjectModalOpen && (
        <ProjectModal
          onSubmit={handleProject}
          onClose={handleClose}
          loading={loading}
          error={error}
        />
      )}
    </>
  );
}
