import Image from 'next/image';
import Link from 'next/link';

const teamMembers = [
  {
    name: 'Albert Flores',
    role: 'VP of Sales',
    image: '/allimages/image2.jpg',
  },
  {
    name: 'Theresa Webb',
    role: 'Business Development Manager',
    image: '/allimages/image3.jpg',
  },
  {
    name: 'Savannah Nguyen',
    role: 'Director of Product',
    image: '/allimages/image4.jpg',
  },
  {
    name: 'Daniel Murphy',
    role: 'Business Analyst',
    image: '/allimages/image5.jpg',
  },
  {
    name: 'Darrell Steward',
    role: 'Director of Sales',
    image: '/allimages/image6.jpg',
  },
];

export default function TeamSection() {
  return (
    <section className="py-20 lg:py-32 bg-white px-4 md:px-10 lg:px-16 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 rounded-3xl overflow-hidden shadow-md">
        
        {/* Text Box (Top Left, spans 2 columns) */}
        <div className="lg:col-span-2 bg-[#F6F8F9] p-10 lg:p-16 xl:p-20 flex flex-col justify-start">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1B3D] tracking-tight mb-6">
            Meet the brain
          </h2>
          <p className="text-[#4F5B73] text-lg leading-relaxed max-w-md">
            Clarity gives you the blocks & components you need to create a truly professional website, landing page or admin panel for your SaaS.
          </p>
        </div>

        {/* Albert */}
        <TeamCard member={teamMembers[0]} />

        {/* Theresa */}
        <TeamCard member={teamMembers[1]} />

        {/* Empty Box with "See All Members" Link (Bottom Left) */}
        <div className="hidden lg:flex bg-[#F6F8F9] p-10 items-end">
          <Link href="#" className="font-bold text-[#0B1B3D] hover:text-[#2563EB] transition-colors flex items-center gap-2 group text-sm md:text-base">
            See All Members
            <span className="transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </Link>
        </div>

        {/* Savannah */}
        <TeamCard member={teamMembers[2]} />

        {/* Daniel */}
        <TeamCard member={teamMembers[3]} />

        {/* Darrell */}
        <TeamCard member={teamMembers[4]} />

        {/* Mobile-only See All Members */}
        <div className="flex lg:hidden bg-[#F6F8F9] p-10 items-center justify-start">
          <Link href="#" className="font-bold text-[#0B1B3D] hover:text-[#2563EB] transition-colors flex items-center gap-2 group text-sm md:text-base">
            See All Members
            <span className="transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </Link>
        </div>

      </div>
    </section>
  );
}

function TeamCard({ member }: { member: { name: string; role: string; image: string } }) {
  return (
    <div className="relative group overflow-hidden bg-gray-200 h-[350px] lg:h-auto min-h-[400px]">
      <Image 
        src={member.image}
        alt={member.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#0B1B3D]/90 via-[#0B1B3D]/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end">
        <h3 className="text-white font-bold text-xl mb-1 drop-shadow-md">{member.name}</h3>
        <p className="text-white/80 font-medium text-sm drop-shadow-md">{member.role}</p>
      </div>
    </div>
  );
}
