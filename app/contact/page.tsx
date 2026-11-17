import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Contact Goyal Traders | Tell us about your project',
  description: 'Share a few details and our team will reply within one working day with the services that fit best.',
};

export default function ContactPage() {
  redirect('/#hero-contact-card');
}
