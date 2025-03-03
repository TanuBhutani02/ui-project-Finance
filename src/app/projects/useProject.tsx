"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Project {
   
    name: string;
    buHead: string;
    delieveryManager: string;
    billingType : string

    // Add other project properties here
}

const useProject = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [project, setProject] = useState<Project | null>(null);

    // useEffect(() => {
    //     //fetchProjects();
    // }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/projects');
            setProjects(response.data);
        } catch (err) {
            setError('Failed to fetch projects');
        } finally {
            setLoading(false);
        }
    };

    const createProject = async (project: Project) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/projects', project);
            setProjects([...projects, response.data]);
        } catch (err) {
            setError('Failed to create project');
        } finally {
            setLoading(false);
        }
    };

    const updateProject = async (project: Project) => {
        setLoading(true);
        // try {
        //     const response = await axios.put(`/api/projects/${project.id}`, project);
        //     setProjects(projects.map(p => (p.id === project.id ? response.data : p)));
        // } catch (err) {
        //     setError('Failed to update project');
        // } finally {
        //     setLoading(false);
        // }
    };

    const deleteProject = async (projectId: number) => {
        setLoading(true);
        // try {
        //     await axios.delete(`/api/projects/${projectId}`);
        //     setProjects(projects.filter(p => p.id !== projectId));
        // } catch (err) {
        //     setError('Failed to delete project');
        // } finally {
        //     setLoading(false);
        // }
    };

    return {
        projects,
        loading,
        error,
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
    };
};

export default useProject;