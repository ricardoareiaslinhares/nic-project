import { useState, useCallback } from "react";

const useNoteModals = () => {
  const [isCreateEditModalOpen, setIsCreateEditModalOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(true); // true = create, false = edit/update

  const openCreateModal = useCallback(() => {

    setIsCreateMode(true);
    setIsCreateEditModalOpen(true);
  }, []);

  const openEditModal = useCallback((id: number) => {
    setIsCreateMode(false);
    setIsCreateEditModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsCreateEditModalOpen(false);
  }, []);

// Delete Modal is a diferente modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const toggleModalDelete = useCallback(() => {
    console.log(isDeleteModalOpen, "toggle called");
    setIsDeleteModalOpen((prev) => !prev);
  }, []);

  return {
    isCreateEditModalOpen,
    isCreateMode,
    openCreateModal,
    openEditModal,
    closeModal,
    isDeleteModalOpen,
    toggleModalDelete
  };
};

export default useNoteModals