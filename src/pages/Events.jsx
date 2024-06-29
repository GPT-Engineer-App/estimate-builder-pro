import React, { useState } from 'react';
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from '../integrations/supabase/index.js';
import { DatePickerDemo } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const Events = () => {
  const { data: events, isLoading, error } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const [newEvent, setNewEvent] = useState({ name: '', date: null });
  const [editingEvent, setEditingEvent] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setNewEvent((prev) => ({ ...prev, date }));
  };

  const handleAddEvent = async () => {
    if (!newEvent.name || !newEvent.date) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await addEvent.mutateAsync(newEvent);
      setNewEvent({ name: '', date: null });
      toast.success("Event added successfully!");
    } catch (error) {
      toast.error(`Error adding event: ${error.message}`);
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setNewEvent({ name: event.name, date: new Date(event.date) });
  };

  const handleUpdateEvent = async () => {
    if (!newEvent.name || !newEvent.date) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await updateEvent.mutateAsync({ ...editingEvent, ...newEvent });
      setEditingEvent(null);
      setNewEvent({ name: '', date: null });
      toast.success("Event updated successfully!");
    } catch (error) {
      toast.error(`Error updating event: ${error.message}`);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent.mutateAsync(id);
      toast.success("Event deleted successfully!");
    } catch (error) {
      toast.error(`Error deleting event: ${error.message}`);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading events: {error.message}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Events</h2>
      <div className="mb-4">
        <Input
          type="text"
          name="name"
          placeholder="Event Name"
          value={newEvent.name}
          onChange={handleInputChange}
          className="mb-2"
        />
        <DatePickerDemo selectedDate={newEvent.date} onDateChange={handleDateChange} />
        {editingEvent ? (
          <Button onClick={handleUpdateEvent} className="mt-2">Update Event</Button>
        ) : (
          <Button onClick={handleAddEvent} className="mt-2">Add Event</Button>
        )}
      </div>
      <Table>
        <TableCaption>List of Events</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.name}</TableCell>
              <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button variant="outline" onClick={() => handleEditEvent(event)} className="mr-2">Edit</Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the event.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteEvent(event.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Events;