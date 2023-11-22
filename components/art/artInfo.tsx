/* eslint-disable-next-line */
export interface ArtInfoProps {}

export function ArtInfo(props: ArtInfoProps) {
  return (
    <section>
      <div className="text-center mx-2 my-12 sm:my-20">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-tight">
          Artistic & Creative projects.
        </h1>
        <p className="text-sm sm:text-base mt-6 px-2 leading-loose text-center">
          &quot;Every child is an artist. The problem is how to remain an artist once we grow up.&quot; - Pablo Picasso
        </p>
      </div>
    </section>
  );
}

export default ArtInfo;