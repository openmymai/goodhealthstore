// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // Delete existing posts first (optional)
  await prisma.post.deleteMany();
  console.log('Deleted existing posts.');

  const postsData = [
    {
      title: '10 เคล็ดลับสู่การนอนหลับที่ดีขึ้น',
      slug: '10-tips-better-sleep',
      content:
        '<p>การนอนหลับเป็นสิ่งสำคัญ... ลองทำตาม 10 เคล็ดลับนี้ดูสิ!</p><ul><li>เข้านอนให้เป็นเวลา</li><li>สร้างบรรยากาศห้องนอน</li></ul><p><em>อ่านต่อเพื่อดูเคล็ดลับทั้งหมด...</em></p>', // Example HTML content
      excerpt:
        'นอนไม่หลับ? ลองใช้ 10 เคล็ดลับง่ายๆ ที่จะช่วยให้คุณนอนหลับสบายตลอดคืน',
      imageUrl: '/images/post-thumbnail-1.jpg', // Use images from your public folder
      published: true,
      publishedAt: new Date('2024-01-15T10:00:00Z'),
    },
    {
      title: 'ประโยชน์ของการทานผักใบเขียว',
      slug: 'benefits-leafy-greens',
      content:
        '<h2>ทำไมต้องทานผักใบเขียว?</h2><p>ผักใบเขียวเต็มไปด้วยวิตามิน แร่ธาตุ และสารต้านอนุมูลอิสระ...</p><img src="/images/post-thumbnail-2.jpg" alt="ผักใบเขียว" />',
      excerpt:
        'ค้นพบเหตุผลว่าทำไมผักใบเขียวจึงเป็นสุดยอดอาหารสำหรับสุขภาพที่ดีของคุณ',
      imageUrl: '/images/post-thumbnail-2.jpg',
      published: true,
      publishedAt: new Date('2024-01-20T11:30:00Z'),
    },
    {
      title: 'เริ่มต้นออกกำลังกายง่ายๆ ที่บ้าน',
      slug: 'easy-home-workout-beginners',
      content:
        '<p>ไม่ต้องไปยิม ก็ฟิตได้! เริ่มต้นง่ายๆ ด้วยท่าออกกำลังกายเหล่านี้...</p>',
      excerpt:
        'แนะนำท่าออกกำลังกายเบื้องต้นสำหรับผู้เริ่มต้น สามารถทำได้ง่ายๆ ที่บ้าน ไม่ต้องใช้อุปกรณ์',
      imageUrl: '/images/post-thumbnail-3.jpg',
      published: true,
      publishedAt: new Date('2024-01-25T09:00:00Z'),
    },
    // Add more posts as needed
  ];

  for (const post of postsData) {
    const createdPost = await prisma.post.create({
      data: post,
    });
    console.log(`Created post with id: ${createdPost.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
