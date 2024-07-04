import { HeroSection } from '@/components/custom/HeroSection';
import qs from 'qs';

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      populate: {
        image: {
          fields: ['url', 'alternativeText'],
        },
        link: {
          populate: true,
        },
      },
    },
  },
});

async function getStrapiData(path: string) {
  const baseUrl = 'http://127.0.0.1:1337';

  const url = new URL(path, baseUrl);
  url.search = homePageQuery;

  try {
    const response = await fetch(url.href);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const strapiData = await getStrapiData('/api/home-page');

  const { blocks } = strapiData.data.attributes;

  console.dir(blocks, { depth: null });

  return (
    <main>
      <HeroSection data={blocks[0]} />
    </main>
  );
}



