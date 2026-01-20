const { Testimonial, Media } = require('../models');

const testimonials = [
  {
    clientName: 'Dr. U. Sai Kiran',
    clientPosition: null,
    clientCompany: 'Life Care Multi Speciality Hospital',
    testimonialText: 'My association with ADONIS has been for ten years. The products I have used till date 26-10-2024 are of superior quality and long term durability. My complete satisfaction with their products compels me to further recommend to others.',
    imageFile: 'testimonial-dr-u-sai-kiran.png',
    orderIndex: 0
  },
  {
    clientName: 'Dr. Rakesh Lamba',
    clientPosition: null,
    clientCompany: 'Matrika Hospital',
    testimonialText: 'There is hardly any fault in this machine. In between 6months ago a problem came and within 12 hours machine was serviced. Very satisfied with service and quality and sales / service Engg. Behaviour',
    imageFile: 'testimonial-dr-rakesh-lamba.png',
    orderIndex: 1
  },
  {
    clientName: 'Sarah Jackson',
    clientPosition: null,
    clientCompany: 'Rudransh Multi Speciality Hospital',
    testimonialText: 'My C Arm machine is seven years old. ADONIS is a good company and services is also very good. Any time services provided by ADONIS. Iam satisfied.',
    imageFile: 'testimonial-sarah-jackson.png',
    orderIndex: 2
  },
  {
    clientName: 'Sai Speciality Hospital',
    clientPosition: null,
    clientCompany: null,
    testimonialText: 'I have heard positive reviews from my colleagues in the healthcare industry about ADONIS, So I decided to use a few of their equipment’s. Needless to say, I was more than happy with what I received.',
    imageFile: 'testimonial-sai-speciality.png',
    orderIndex: 3
  },
  {
    clientName: 'Dr. S. Karthik',
    clientPosition: null,
    clientCompany: 'Global Ortho & Trauma Hospital',
    testimonialText: 'What sets ADONIS apart from other medical suppliers is their willingness to go the extra mile. The customer support I got was exemplary and they answered all of my queries patiently just to ensure I was completely satisfied.',
    imageFile: 'testimonial-dr-s-karthik.png',
    orderIndex: 4
  }
];

async function seed() {
  try {
    console.log('Seeding Testimonials...');

    // 1. Delete all existing testimonials
    // We use destroy with truncate option if possible, or just delete all
    await Testimonial.destroy({ where: {} });
    console.log('Cleared old testimonials');

    // 2. Insert new ones
    for (const t of testimonials) {
      // Create Media
      const media = await Media.create({
        fileName: t.imageFile,
        filePath: `/uploads/testimonials/${t.imageFile}`,
        fileType: 'image',
        mimeType: 'image/png',
        altText: t.clientName,
        sectionName: 'Testimonials'
      });

      // Create Testimonial
      await Testimonial.create({
        clientName: t.clientName,
        clientPosition: t.clientPosition,
        clientCompany: t.clientCompany,
        clientImageId: media.id,
        testimonialText: t.testimonialText,
        rating: 5,
        orderIndex: t.orderIndex,
        isFeatured: false,
        isActive: true
      });
      console.log(`Created testimonial for ${t.clientName}`);
    }

    console.log('Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    console.error(err);
    process.exit(1);
  }
}

seed();
