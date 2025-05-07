
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

// Sample appointment type definition
interface Appointment {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: string;
  doctor: string;
  notes?: string;
}

const Appointments = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      title: 'Annual Checkup',
      date: new Date(2025, 4, 15),
      time: '09:30 AM',
      type: 'General',
      doctor: 'Dr. Smith'
    },
    {
      id: '2',
      title: 'Blood Test',
      date: new Date(2025, 4, 22),
      time: '11:00 AM',
      type: 'Lab Work',
      doctor: 'Dr. Johnson'
    }
  ]);
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    time: '',
    type: 'General',
    doctor: '',
    notes: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddAppointment = () => {
    if (!date || !newAppointment.title || !newAppointment.time || !newAppointment.doctor) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const appointment: Appointment = {
      id: Date.now().toString(),
      date: date,
      ...newAppointment
    };

    setAppointments([...appointments, appointment]);
    setNewAppointment({
      title: '',
      time: '',
      type: 'General',
      doctor: '',
      notes: ''
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Appointment Scheduled",
      description: `${appointment.title} on ${appointment.date.toLocaleDateString()} at ${appointment.time}`,
    });
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
    
    toast({
      title: "Appointment Cancelled",
      description: "The appointment has been removed from your calendar",
    });
  };

  // Get appointments for the selected date
  const appointmentsForSelectedDate = appointments.filter(
    apt => date && apt.date.toDateString() === date.toDateString()
  );

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">Appointments</h1>
            <p className="text-gray-600">Schedule and manage your medical appointments</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-health-primary hover:bg-health-secondary text-white">
                  Add Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Schedule New Appointment</DialogTitle>
                  <DialogDescription>
                    Enter the details for your new medical appointment.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={newAppointment.title}
                      onChange={(e) => setNewAppointment({...newAppointment, title: e.target.value})}
                      className="col-span-3"
                      placeholder="Annual checkup"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time" className="text-right">
                      Time
                    </Label>
                    <Input
                      id="time"
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                      className="col-span-3"
                      placeholder="10:00 AM"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select 
                      value={newAppointment.type}
                      onValueChange={(value) => setNewAppointment({...newAppointment, type: value})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Appointment Type</SelectLabel>
                          <SelectItem value="General">General</SelectItem>
                          <SelectItem value="Specialist">Specialist</SelectItem>
                          <SelectItem value="Lab Work">Lab Work</SelectItem>
                          <SelectItem value="Follow-up">Follow-up</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="doctor" className="text-right">
                      Doctor
                    </Label>
                    <Input
                      id="doctor"
                      value={newAppointment.doctor}
                      onChange={(e) => setNewAppointment({...newAppointment, doctor: e.target.value})}
                      className="col-span-3"
                      placeholder="Dr. Smith"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="notes" className="text-right">
                      Notes
                    </Label>
                    <Input
                      id="notes"
                      value={newAppointment.notes}
                      onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                      className="col-span-3"
                      placeholder="Additional notes"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddAppointment}>Schedule Appointment</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-1 h-auto">
          <h2 className="text-xl font-semibold mb-4">Select Date</h2>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </Card>
        
        <Card className="p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">
            {date ? `Appointments for ${date.toLocaleDateString()}` : 'Select a date'}
          </h2>
          
          {appointmentsForSelectedDate.length > 0 ? (
            <div className="space-y-4">
              {appointmentsForSelectedDate.map((appointment) => (
                <div key={appointment.id} className="p-4 border rounded-lg bg-white shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{appointment.title}</h3>
                      <p className="text-gray-600">
                        <span className="font-semibold">Time:</span> {appointment.time}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Type:</span> {appointment.type}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Doctor:</span> {appointment.doctor}
                      </p>
                      {appointment.notes && (
                        <p className="text-gray-600 mt-2">
                          <span className="font-semibold">Notes:</span> {appointment.notes}
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteAppointment(appointment.id)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No appointments scheduled for this date</p>
              <Button 
                className="mt-4"
                variant="outline"
                onClick={() => setIsDialogOpen(true)}
              >
                Add Appointment
              </Button>
            </div>
          )}
        </Card>
      </div>
    </MainLayout>
  );
};

export default Appointments;
