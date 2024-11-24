"use client";

const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-800">About UBEPSA</h1>
        <p className="text-gray-700 text-lg mt-2">
          The journey, challenges, and triumphs of the University of Benin
          Physiotherapy Association.
        </p>
      </header>

      {/* Content */}
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Introduction */}
        <section className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Like every other association, the University of Benin Physiotherapy
            Association (UBEPSA) has faced its share of challenges and triumphs.
            The association fosters unity and development among physiotherapy
            students, functioning as a "Big Family" with a clear vision to build
            a strong, structured, and vibrant community.
          </p>
        </section>

        {/* History */}
        <section className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">History</h2>
          <p className="text-gray-700 leading-relaxed">
            UBEPSA was established in 2016, following the matriculation of the
            first set of students in the infant Physiotherapy Department. The
            first administration, led by Comr. Oghenekaro, set the foundation
            with a clear vision, initiating elections and establishing key
            traditions like the UBEPSA Health Week.
          </p>
        </section>

        {/* Major Milestones */}
        <section className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Major Milestones
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              Launch of the first Physio Vibes Magazine under the leadership of
              Comr. Ebubechi Anya.
            </li>
            <li>First UBEPSA Symposium and successful Health Week events.</li>
            <li>
              Construction of the UBEPSA Secretariat during the presidency of
              Comr. Honor Oteme.
            </li>
            <li>
              Introduction of MOCCOP (now POC) for community outreach and
              raising awareness of physiotherapy.
            </li>
          </ul>
        </section>

        {/* Challenges and Resilience */}
        <section className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Challenges and Resilience
          </h2>
          <p className="text-gray-700 leading-relaxed">
            UBEPSA has faced financial challenges, low member engagement, and
            moments of internal conflict. Despite these, the association has
            consistently risen above obstacles, crediting its success to the
            dedication of its members and leadership.
          </p>
        </section>

        {/* Current Administration */}
        <section className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Current Administration
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The 7th administration, led by Comr. Durojaye Bayode, has achieved
            significant milestones, including passing the MRTBN and NUC
            accreditation tests and hosting intellectual events like
            inter-departmental debate competitions.
          </p>
        </section>

        {/* Future Aspirations */}
        <section className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Future Aspirations
          </h2>
          <p className="text-gray-700 leading-relaxed">
            UBEPSA aims to strengthen internal relationships, foster unity, and
            leverage the intellectual and innovative potentials of its members
            to achieve greater feats. With a vision for dominance within the
            university and beyond, the future of UBEPSA looks bright.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
