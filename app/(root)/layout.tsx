import Header from '@/components/layout/Header'
import React from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}
