import React from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
  const services = [
    {
      id: 'food-distribution',
      title: "Free Food Distribution",
      description: "Organize food distribution events or feast for the community. Help fight hunger and bring people together.",
      icon: "🍱",
      categories: ['Food', 'Community']
    },
    {
      id: 'community-service',
      title: "Community Service",
      description: "Volunteer for various community service activities like cleaning, teaching, or helping the elderly.",
      icon: "🤝",
      categories: ['Volunteer', 'Community']
    },
    {
      id: 'medical-camps',
      title: "Medical Camps",
      description: "Organize or participate in free medical checkup camps for the underprivileged communities.",
      icon: "⚕️",
      categories: ['Healthcare', 'Community']
    },
    {
      id: 'blood-donation',
      title: "Blood Donation",
      description: "Organize blood donation camps or connect blood donors with those in need.",
      icon: "🩸",
      categories: ['Healthcare', 'Emergency']
    },
    {
      id: 'education-support',
      title: "Education Support",
      description: "Provide free education, tutoring, or educational resources to underprivileged students.",
      icon: "📚",
      categories: ['Education', 'Youth']
    },
    {
      id: 'elder-care',
      title: "Elder Care",
      description: "Support and care programs for elderly people in the community.",
      icon: "👴",
      categories: ['Healthcare', 'Elderly']
    },
    {
      id: 'environmental-care',
      title: "Environmental Care",
      description: "Organize clean-up drives, plantation events, and environmental awareness programs.",
      icon: "🌱",
      categories: ['Environment', 'Community']
    },
    {
      id: 'skill-development',
      title: "Skill Development",
      description: "Free workshops and training programs for developing various skills.",
      icon: "💡",
      categories: ['Education', 'Career']
    },
    {
    id: 'mental-health',
    title: "Mental Health Support",
    description: "Free counseling services and mental health awareness programs.",
    icon: "🧠",
    categories: ['Healthcare', 'Wellness']
    },
    {
    id: 'animal-welfare',
    title: "Animal Welfare",
    description: "Care for stray animals, adoption drives, and veterinary camps.",
    icon: "🐾",
    categories: ['Animals', 'Healthcare']
    },
    {
    id: 'digital-literacy',
    title: "Digital Literacy",
    description: "Free computer and internet training for underprivileged communities.",
    icon: "💻",
    categories: ['Education', 'Technology']
    },
    {
    id: 'homeless-shelter',
    title: "Homeless Shelter",
    description: "Temporary shelter and support services for homeless individuals.",
    icon: "🏠",
    categories: ['Shelter', 'Support']
    },
    {
    id: 'waste-management',
    title: "Waste Management",
    description: "Community waste collection and recycling initiatives.",
    icon: "♻️",
    categories: ['Environment', 'Community']
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join us in making a difference. Choose a service to create or view posts
            and connect with others who want to help.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              serviceId={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;