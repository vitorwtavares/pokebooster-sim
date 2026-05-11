import { FC } from 'react'
import { motion } from 'framer-motion'

import * as S from './PackIdle.styles'
import PackVisual from './PackVisual'

interface PackTearProps {
  logoSrc: string
  packArt: string | null
}

const PackTear: FC<PackTearProps> = ({ logoSrc, packArt }) => (
  <S.IdleContainer>
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0.8, y: 24 }}
      transition={{ duration: 0.18 }}
    >
      <S.PackWrapper>
        <S.PackCard $isCutting={true}>
          <motion.div
            animate={{ opacity: [0, 0.85, 0.15], scale: [0.8, 1.08, 1.2] }}
            initial={{ opacity: 0, scale: 0.75 }}
            style={{
              position: 'absolute',
              inset: '18% 10%',
              borderRadius: '28px',
              background:
                'radial-gradient(circle, rgba(255, 236, 179, 0.92) 0%, rgba(255, 206, 84, 0.35) 45%, rgba(255, 255, 255, 0) 78%)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
            transition={{ duration: 0.7, times: [0, 0.55, 1] }}
          />
          <motion.div
            animate={{ opacity: [0.25, 1, 1], scale: [0.85, 1.02, 1] }}
            initial={{ opacity: 0.15, scale: 0.82 }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2,
            }}
            transition={{ duration: 0.42 }}
          >
            <S.PackBodySlice>
              <S.PackSurface>
                <PackVisual logoSrc={logoSrc} packArt={packArt} />
              </S.PackSurface>
            </S.PackBodySlice>
          </motion.div>
          <motion.div
            animate={{
              opacity: [1, 1, 0],
              rotate: [0, -10, -22],
              x: [0, -10, -34],
              y: [0, -34, -108],
            }}
            initial={{ opacity: 1, rotate: 0, x: 0, y: 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              transformOrigin: 'top center',
              zIndex: 5,
            }}
            transition={{ duration: 0.62, times: [0, 0.5, 1] }}
          >
            <S.PackCapSlice>
              <S.PackSurface>
                <PackVisual logoSrc={logoSrc} packArt={packArt} />
              </S.PackSurface>
            </S.PackCapSlice>
          </motion.div>
        </S.PackCard>
      </S.PackWrapper>
    </motion.div>
  </S.IdleContainer>
)

export default PackTear
